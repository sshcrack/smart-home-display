import getPixels from 'get-pixels';
import SpotifyWebApi from 'spotify-web-api-node';
import config from 'src/config';
import { SpotifyConfigInterface } from 'src/utils/configInterface';
import MainLogger from 'src/utils/logger/main';
import RegManMain from 'src/utils/register/main';
import { getSpotifyImg } from 'src/utils/spotify';
import store from '../store';
import { SpotifyInfo } from './interface';
import extractColors = require('extract-colors');

const disabled = config.spotify.disabled
const {
    accessToken: configAccessToken,
    refreshToken: configRefreshToken,
    clientID,
    clientSecret,
    activeUpdateInterval,
    idleUpdateInterval
} = (!disabled ? config.spotify : {}) as SpotifyConfigInterface

type ResponseType = { statusCode: number, body: { error: { message: string } } }

const log = MainLogger.get("Spotify")
export default class SpotifyManager {
    private static curr: SpotifyInfo;
    private static currConstantUpdateId: NodeJS.Timeout;
    private static currUpdateLoopId: NodeJS.Timeout;
    private static api = new SpotifyWebApi({
        accessToken: store.get("accessToken") ?? configAccessToken,
        refreshToken: store.get("refreshToken") ?? configRefreshToken,
        clientId: clientID,
        clientSecret
    })

    static register() {
        RegManMain.onPromise("spotify_get", async () => this.curr)
        RegManMain.onPromise("spotify_play", (_, opt) => this.apiWrapper(() => this.api.play(opt), true));
        RegManMain.onPromise("spotify_pause", (_, opt) => this.apiWrapper(() => this.api.pause(opt), true));
        RegManMain.onPromise("spotify_backward", (_, opt) => this.apiWrapper(() => this.api.skipToPrevious(opt), true));
        RegManMain.onPromise("spotify_skip", (_, opt) => this.apiWrapper(() => this.api.skipToNext(opt), true));

        this.update()
    }

    static async apiWrapper<T>(promFunc: () => Promise<T>, update?: boolean) {
        if (disabled)
            return Promise.reject(new Error("Spotify Manager is disabled."))

        return promFunc()
            .catch(async e => {
                if (!(await this.checkTokenExpired(e)))
                    throw e

                return promFunc()
            })
            .then(() => {
                if (!update)
                    return

                return this.update(true, 1000)
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

    static async update(important = false, updateOverwrite = -1) {
        const scheduleUpdate = () => {
            if (this.currUpdateLoopId)
                clearTimeout(this.currUpdateLoopId)

            const updateInterval = updateOverwrite !== -1 ? updateOverwrite : this.curr?.isPlaying ? activeUpdateInterval : idleUpdateInterval
            this.currUpdateLoopId = setTimeout(this.update.bind(this), updateInterval)

            if (this.curr?.isPlaying) {
                this.currConstantUpdateId = setTimeout(() => {
                    this.curr.progressMs += 1000
                }, 1000)
            }
        }

        await this.api.getMyCurrentPlaybackState()
            .then(resp => {
                if (this.currConstantUpdateId)
                    clearTimeout(this.currConstantUpdateId)

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

                if (important)
                    RegManMain.send("spotify_update")
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