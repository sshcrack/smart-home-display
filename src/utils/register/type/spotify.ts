import { SpotifyInfo } from 'src/backend/spotify/interface'
import { addPrefixUnderscoreToObject } from 'src/types/additions'

export type SpotifyEventPromises = addPrefixUnderscoreToObject<{
    get: () => SpotifyInfo | null
}, "spotify">