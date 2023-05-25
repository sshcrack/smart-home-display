import { DeviceOptions, PlayOptions } from 'src/backend/spotify/interface'
import { getAddRemoveListener } from 'src/utils/listener'
import RegManRender from 'src/utils/register/render'

export type SpotifyListenerType = () => unknown
const listeners = [] as SpotifyListenerType[]

RegManRender.on("spotify_update", () => listeners.forEach(e => e()))
const spotify = {
    get: () => RegManRender.emitPromise("spotify_get"),
    backward: (opt?: DeviceOptions) => RegManRender.emitPromise("spotify_backward", opt),
    skip: (opt?: DeviceOptions) => RegManRender.emitPromise("spotify_skip", opt),
    play: (opt?: PlayOptions) => RegManRender.emitPromise("spotify_play", opt),
    pause: (opt?: DeviceOptions) => RegManRender.emitPromise("spotify_pause", opt),
    addUpdateListener: (list: SpotifyListenerType) => getAddRemoveListener(list, listeners)
}

export default spotify