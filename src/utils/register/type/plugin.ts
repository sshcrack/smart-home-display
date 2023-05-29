import { DeviceOptions, PlayOptions, SpotifyInfo } from 'src/backend/spotify/interface'
import { addPrefixUnderscoreToObject } from 'src/types/additions'

export type PluginEventPromises = addPrefixUnderscoreToObject<{
    registered: (pluginId: string) => unknown,
}, "plugin">

export type PluginMainToRenderer = addPrefixUnderscoreToObject<{
    registered: (pluginId: string) => unknown
}, "plugin">