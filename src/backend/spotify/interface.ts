import { FinalColor } from 'extract-colors'
import { DateTime } from 'luxon'
import SpotifyWebApi from 'spotify-web-api-node'

export type SpotifyInfo = {
    item: ItemInfo,
    listeningOn: SpotifyApi.UserDevice,
    progressMs: number,
    isPlaying: boolean,
}

export type ItemInfo = (SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObject) & {
    palette: FinalColor[]
}

const e = new SpotifyWebApi()
export type PlayOptions = Parameters<typeof e["play"]>[0]
export type DeviceOptions = Parameters<typeof e["pause"]>[0]