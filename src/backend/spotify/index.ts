import SpotifyWebApi from 'spotify-web-api-node';
import config from 'src/config';
import RegManMain from 'src/utils/register/main';
import store from '../store';
import MainLogger from 'src/utils/logger/main';

const {
    accessToken,
    refreshToken,
    clientID,
    clientSecret,
    activeUpdateInterval,
    idleUpdateInterval
} = config.spotify


const log = MainLogger.get("Spotify")
export default class SpotifyManager {
    private static curr: SpotifyApi.CurrentlyPlayingResponse;
    private static api = new SpotifyWebApi({
        accessToken: store.get("accessToken") ?? accessToken,
        refreshToken: store.get("refreshToken") ?? refreshToken,
        clientId: clientID,
        clientSecret
    })

    static register() {
        RegManMain.onPromise("spotify_get", async () => this.curr)

        this.update()
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
            if (refresh_token)
                store.set("refreshToken", refresh_token)

            log.debug("Scheduling update token...")
            setTimeout(() => this.updateToken(), expires_in * 1000 - 1000)
        })
    }

    static update() {
        const scheduleUpdate = () => {
            const updateInterval = this.curr?.is_playing ? activeUpdateInterval : idleUpdateInterval
            setTimeout(this.update.bind(this), updateInterval)
        }

        this.api.getMyCurrentPlaybackState()
            .then(e => {
                this.curr = e.statusCode === 204 ? null : e.body

                scheduleUpdate()
            })
            .catch(async e => {
                console.log("err", JSON.stringify(e))
                if (e.statusCode !== 401)
                    return scheduleUpdate()

                await this.updateToken()
                scheduleUpdate()
            })

    }
}