import RegManRender from 'src/utils/register/render'

const spotify = {
    get: () => RegManRender.emitPromise("spotify_get")
}

export default spotify