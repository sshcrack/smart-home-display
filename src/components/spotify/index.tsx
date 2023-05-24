import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from "react"

type TrackType = SpotifyApi.CurrentlyPlayingObject
export type SpotifyContextState = {
    track: TrackType
}
export const SpotifyContext = React.createContext<SpotifyContextState>({
    track: null
})

export default function SpotifyProvider({ children }: React.PropsWithChildren<{}>) {
    const [track, setTrack] = useState<TrackType>(null)
    const { spotify } = window.api

    useEffect(() => {
        const id = setInterval(() => {
            
        }, 1000)
    }, [])

    return <SpotifyContext.Provider value={{
        track
    }}>
        {children}
    </SpotifyContext.Provider>
}