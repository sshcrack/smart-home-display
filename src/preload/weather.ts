import RegManRender from 'src/utils/register/render'

const weather = {
    now: () => RegManRender.emitPromise("weather_now")
}

export default weather