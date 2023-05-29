import { DefaultConfigInterface } from './configInterface'

const CONFIG_DEFAULTS: DefaultConfigInterface = {
    clock: {},
    weather: {
        lang: "en",
        units: "metric",
        updateInterval: 10000
    },
    spotify: {
        activeUpdateInterval: 1000,
        idleUpdateInterval: 1000 * 10
    },
    background: {
        freeze: false
    }
}

export default CONFIG_DEFAULTS