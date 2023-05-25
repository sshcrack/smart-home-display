import { Flex, FlexProps, Grid } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from "react"
import Clock from 'src/pages/general/widgets/clock'
import Date from 'src/pages/general/widgets/clock/date'
import SpotifySongBgGradient from './widgets/songBgGradient'
import SpotifyLogo from './widgets/logo/logo'
import { SpotifyInfo } from 'src/backend/spotify/interface'
import SpotifyNothingPlaying from './widgets/nothingPlaying'
import { useHistory } from 'react-router-dom'
import { SpotifyContext } from 'src/components/spotify'
import SpotifyPlayer from './widgets/player'

const hasClass = (element: HTMLElement, className: string) => {
    return element.classList.contains(className);
};

const hasParent: (element: HTMLElement, className: string) => boolean = (element: HTMLElement, className: string) => {
    if (!element.parentElement) {
        return false;
    }

    if (hasClass(element, className)) {
        return true;
    }

    return hasParent(element.parentElement, className)
};

const NAVIGATE_BACK_TIMEOUT_MS = 1000 * 10
export default function SpotifyScreen(props: FlexProps) {
    const history = useHistory()
    const [navigateBackTimeout, setBackTimeout] = useState<NodeJS.Timeout>(null)
    const { item, isPlaying } = useContext(SpotifyContext)

    useEffect(() => {
        if (!item && !navigateBackTimeout && !isPlaying)
            return setBackTimeout(setTimeout(() => history.push("/"), NAVIGATE_BACK_TIMEOUT_MS))

        if (item && navigateBackTimeout) {
            clearTimeout(navigateBackTimeout)
            setBackTimeout(null)
        }

    }, [item, navigateBackTimeout])

    return <Flex
        {...props}
        w='100%'
        h='100%'
        flexDir='column'
        alignItems='center'
        onClick={e => {
            const parent = hasParent(e.target as HTMLElement, "dont_navigate")
            if (parent)
                return

            history.push("/")
        }}
    >
        <Grid
            p='3'
            w='100%'
            backdropFilter='blur(10px)'
            bg='linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))'

            alignItems='center'

            gridAutoColumns='1fr'
            gridAutoFlow='column'
        >
            <Clock size='1.25rem' justifySelf='start' />
            <SpotifyLogo gap='2' justifyContent='center' />
            <Date size='1.25rem' short justifySelf='end' />
        </Grid>
        <Flex
            flex='1'
            w='100%'
            h='100%'
            justifyContent='center'
            alignItems='center'
        >
            <SpotifySongBgGradient
                backdropFilter='blur(10px)'
                w='80%'
                h='80%'
                rounded='xl'
                className={item && "dont_navigate"}
            >
                {!item && <SpotifyNothingPlaying />}
                {item && <SpotifyPlayer w='100%' h='100%' />}
            </SpotifySongBgGradient>
        </Flex>
    </Flex>
}