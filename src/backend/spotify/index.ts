import SpotifyWebApi from 'spotify-web-api-node';
import config from 'src/config';
import RegManMain from 'src/utils/register/main';
import store from '../store';
import MainLogger from 'src/utils/logger/main';
import getPixels from 'get-pixels';
import { getSpotifyImg } from 'src/utils/spotify';
import extractColors = require('extract-colors');
import { PlayOptions, SpotifyInfo } from './interface';

const {
    accessToken: configAccessToken,
    refreshToken: configRefreshToken,
    clientID,
    clientSecret,
    activeUpdateInterval,
    idleUpdateInterval
} = config.spotify

type ResponseType = { statusCode: number, body: { error: { message: string } } }

const log = MainLogger.get("Spotify")
export default class SpotifyManager {
    private static curr: SpotifyInfo;
    private static currTimeUpdateId: NodeJS.Timeout;
    private static api = new SpotifyWebApi({
        accessToken: store.get("accessToken") ?? configAccessToken,
        refreshToken: store.get("refreshToken") ?? configRefreshToken,
        clientId: clientID,
        clientSecret
    })

    static register() {
        RegManMain.onPromise("spotify_get", async () => this.curr)
        RegManMain.onPromise("spotify_play", (_, opt) => this.checkUpdateWrapper(() => this.api.play(opt)));
        RegManMain.onPromise("spotify_pause", (_, opt) => this.checkUpdateWrapper(() => this.api.pause(opt)));
        RegManMain.onPromise("spotify_backward", (_, opt) => this.checkUpdateWrapper(() => this.api.skipToPrevious(opt)));
        RegManMain.onPromise("spotify_skip", (_, opt) => this.checkUpdateWrapper(() => this.api.skipToNext(opt)));

        this.update()
    }

    static async checkUpdateWrapper<T>(promFunc: () => Promise<T>) {
        return promFunc()
            .catch(async e => {
                if (!(await this.checkTokenExpired(e)))
                    throw e

                return promFunc()
            })
    }

    static async updateToken() {
        log.silly("Updating token...")
        return this.api.refreshAccessToken((e, resp) => {
            if (e) {
                log.error("Could not update refresh token:", e)
                return
            }

            const { access_token, refresh_token, expires_in } = resp.body

            log.info("Token successfully updated.")
            store.set("accessToken", access_token)
            if (refresh_token) {
                store.set("refreshToken", refresh_token)
                this.api.setRefreshToken(refresh_token)

            }

            this.api.setAccessToken(access_token)
            log.debug("Scheduling update token...")
            setTimeout(() => this.updateToken(), expires_in * 1000 - 1000)
        })
    }

    static async updatePalette() {
        const url = getSpotifyImg(this.curr?.item)
        if (!url)
            return log.error("Tried to get palette from not existing image", url)

        getPixels(url.url, (err, pixels) => {
            if (err)
                return

            const data = [...pixels.data]
            const width = Math.round(Math.sqrt(data.length / 4))
            const height = width

            extractColors.default({ data, width, height })
                .then(e => this.curr.item.palette = e)
                .catch(e => log.error("Palette err", e))
        })
    }

    static update() {
        const scheduleUpdate = () => {
            const updateInterval = this.curr?.isPlaying ? activeUpdateInterval : idleUpdateInterval
            setTimeout(this.update.bind(this), updateInterval)

            if (this.curr?.isPlaying) {
                this.currTimeUpdateId = setTimeout(() => {
                    this.curr.progressMs += 1000
                }, 1000)
            }
        }

        this.api.getMyCurrentPlaybackState()
            .then(resp => {
                if (this.currTimeUpdateId)
                    clearTimeout(this.currTimeUpdateId)

                const prevId = this.curr?.item?.id

                if (resp.statusCode === 204)
                    this.curr = null
                else {
                    const { is_playing, progress_ms, item, device } = resp.body
                    this.curr = {
                        listeningOn: device,
                        isPlaying: is_playing,
                        progressMs: progress_ms,
                        item: {
                            palette: this.curr?.item?.palette,
                            ...item
                        }
                    }
                }

                const currId = this.curr?.item?.id
                if (prevId !== currId && currId)
                    this.updatePalette()
                scheduleUpdate()
            })
            .catch(async e => {
                console.log("err", JSON.stringify(e))
                await this.checkTokenExpired(e)

                scheduleUpdate()
            })
    }

    private static async checkTokenExpired(e: ResponseType) {
        if (e?.statusCode !== 401 || !e?.body?.error?.message?.includes("access token expired"))
            return false;


        await this.updateToken()
        return true
    }
}