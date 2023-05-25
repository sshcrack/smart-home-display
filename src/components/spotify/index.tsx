import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from "react"
import { SpotifyInfo } from 'src/backend/spotify/interface';
import { getSpotifyImg } from 'src/utils/spotify';

export type SpotifyContextState = SpotifyInfo & {
    cover: SpotifyApi.ImageObject
}

export const SpotifyContext = React.createContext<SpotifyContextState>({
    isPlaying: false,
    item: null,
    listeningOn: null,
    progressMs: 0,
    cover: null
})

export default function SpotifyProvider({ children }: React.PropsWithChildren<{}>) {
    const [info, setInfo] = useState<SpotifyInfo>(null)
    const { spotify } = window.api

    useEffect(() => {
        const onUpdate = () => spotify.get().then(e => setInfo(e))

        const id = setInterval(() => onUpdate(), 1000)
        onUpdate()

        return () => clearInterval(id)
    }, [])

    return <SpotifyContext.Provider value={{
        ...info,
        cover: getSpotifyImg(info.item)
    } ?? {} as null}>
        {children}
    </SpotifyContext.Provider>
}