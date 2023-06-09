import React, { useEffect, useState } from "react";
import { SpotifyInfo } from 'src/backend/spotify/interface';
import config from "src/config";
import { getSpotifyImg } from 'src/utils/spotify';

const disabled = config.spotify.disabled
export type SpotifyContextState = SpotifyInfo & {
    cover: SpotifyApi.ImageObject,
    update: () => unknown
}

export const SpotifyContext = React.createContext<SpotifyContextState>({
    isPlaying: false,
    item: null,
    listeningOn: null,
    progressMs: 0,
    cover: null,
    update: null
})

export default function SpotifyProvider({ children }: React.PropsWithChildren<{}>) {
    if (disabled)
        return <>{children}</>

    const [info, setInfo] = useState<SpotifyInfo>(null)
    const [update, setUpdate] = useState(0)
    const { spotify } = window.api

    useEffect(() => {
        const id = setInterval(() => setUpdate(Math.random()), 1000)

        return () => clearInterval(id)
    }, [])

    useEffect(() => { spotify.get().then(e => setInfo(e)) }, [update])

    return <SpotifyContext.Provider value={{
        ...info,
        cover: getSpotifyImg(info?.item),
        update: () => setUpdate(Math.random())
    } ?? {} as null}>
        {children}
    </SpotifyContext.Provider>
}