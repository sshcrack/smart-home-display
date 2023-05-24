import { addPrefixUnderscoreToObject } from 'src/types/additions'

export type SpotifyEventPromises = addPrefixUnderscoreToObject<{
    get: () => SpotifyApi.CurrentlyPlayingResponse | null
}, "spotify">