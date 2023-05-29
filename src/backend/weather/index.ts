import RegManMain from 'src/utils/register/main';
import fetch from "node-fetch"
import { WEATHER_NOW_URL } from './consts';
import { CurrentWeather } from './interface';

export class WeatherManager {
    static register() {
        RegManMain.onPromise("weather_now", () => WeatherManager.getCurrentWeather())
    }

    static async getCurrentWeather() {
        //TODO remove if in prod
        const data = { "coord": { "lon": 7.291, "lat": 52.6906 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "base": "stations", "main": { "temp": 13.61, "feels_like": 12.65, "temp_min": 13.05, "temp_max": 15.03, "pressure": 1023, "humidity": 62 }, "visibility": 10000, "wind": { "speed": 4.12, "deg": 360 }, "clouds": { "all": 75 }, "dt": 1684930744, "sys": { "type": 1, "id": 1871, "country": "DE", "sunrise": 1684898522, "sunset": 1684956813 }, "timezone": 7200, "id": 2871845, "name": "Meppen", "cod": 200 }
    
        return data as CurrentWeather;
        return fetch(WEATHER_NOW_URL)
            .then(e => e.json())
            .then(e => e as CurrentWeather)
    }
}