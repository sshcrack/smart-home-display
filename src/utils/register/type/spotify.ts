import { DeviceOptions, PlayOptions, SpotifyInfo } from 'src/backend/spotify/interface'
import { addPrefixUnderscoreToObject } from 'src/types/additions'

export type SpotifyEventPromises = addPrefixUnderscoreToObject<{
    get: () => SpotifyInfo | null,
    skip: (opt?: DeviceOptions) => unknown,
    backward: (opt?: DeviceOptions) => unknown,
    play: (opt?: PlayOptions) => unknown,
    pause: (opt?: DeviceOptions) => unknown
}, "spotify">