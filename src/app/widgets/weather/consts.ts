import config from 'src/config'
const weather = config.weather

export const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5"
const CONFIG_OPTS = `APPID=${weather.apiKey}&lang=${weather.lang?? "en"}`
export const WEATHER_NOW_URL = `${WEATHER_BASE_URL}/weather?q=${weather.location}&${CONFIG_OPTS}`
export const weatherCodeToUrl = (code: string) => `https://openweathermap.org/img/wn/${code}@2x.png`