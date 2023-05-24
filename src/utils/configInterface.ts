import { WeatherUnits } from 'src/backend/weather/consts'
import { FlipOptional } from 'src/types/additions'

export interface ConfigInterface {
    weather: {
        location: string,
        apiKey: string,
        units?: WeatherUnits,
        lang?: string,
        updateInterval?: number
    },
    clock: {
        zone: string,
        locale: string
    },
    spotify: {
        clientID: string
        clientSecret: string
        accessToken: string
        refreshToken: string,

        activeUpdateInterval?: number,
        idleUpdateInterval?: number
    }
}

export type DefaultConfigInterface = {
    [T in keyof ConfigInterface]: FlipOptional<ConfigInterface[T]>
}