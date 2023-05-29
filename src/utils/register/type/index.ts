import { PluginEventPromises, PluginMainToRenderer } from './plugin'
import { SpotifyEventPromises, SpotifyMainToRenderer } from './spotify'
import { WeatherEventPromises } from './weather'


export type RegisterEvents = {}
export type RegisterEventsPromises = WeatherEventPromises
& SpotifyEventPromises
& PluginEventPromises

export type MainToRender = SpotifyMainToRenderer & PluginMainToRenderer
