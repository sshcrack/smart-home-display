import RegManMain from 'src/utils/register/main'
import { WeatherManager } from './weather'
import SpotifyManager from './spotify'

const registerFuncs = [
    () => RegManMain.register(),
    () => WeatherManager.register(),
    () => SpotifyManager.register()
]

export default registerFuncs