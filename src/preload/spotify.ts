import { DeviceOptions, PlayOptions } from 'src/backend/spotify/interface'
import RegManRender from 'src/utils/register/render'

const spotify = {
    get: () => RegManRender.emitPromise("spotify_get"),
    backward: (opt?: DeviceOptions) => RegManRender.emitPromise("spotify_backward", opt),
    skip: (opt?: DeviceOptions) => RegManRender.emitPromise("spotify_skip", opt),
    play: (opt?: PlayOptions) => RegManRender.emitPromise("spotify_play", opt),
    pause: (opt?: DeviceOptions) => RegManRender.emitPromise("spotify_pause", opt),
}

export default spotify