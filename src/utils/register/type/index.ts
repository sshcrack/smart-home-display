import { SpotifyEventPromises, SpotifyMainToRender } from './spotify'
import { WeatherEventPromises } from './weather'


export type RegisterEvents = {}
export type RegisterEventsPromises = WeatherEventPromises
& SpotifyEventPromises

export type MainToRender = SpotifyMainToRender
