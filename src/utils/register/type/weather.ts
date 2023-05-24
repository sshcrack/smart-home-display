import { CurrentWeather } from 'src/backend/weather/interface'
import { addPrefixUnderscoreToObject } from 'src/types/additions'

export type WeatherEventPromises = addPrefixUnderscoreToObject<{
    now: () => CurrentWeather
}, "weather">