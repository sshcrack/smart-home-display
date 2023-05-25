import { FinalColor } from 'extract-colors'
import { DateTime } from 'luxon'

export type SpotifyInfo = {
    item: ItemInfo,
    listeningOn: SpotifyApi.UserDevice,
    progressMs: number,
    isPlaying: boolean,
}

export type ItemInfo = (SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObject) & {
    palette: FinalColor[]
}