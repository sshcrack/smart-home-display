import { ItemInfo, SpotifyInfo } from 'src/backend/spotify/interface'

export function getSpotifyImg(item: ItemInfo) {
    if (!item)
        return null
    return item.type === "track" ?
        item.album.images?.[0] :
        item.images?.[0]
}