import { Flex, FlexProps, Grid } from '@chakra-ui/react'
import React, { useContext } from "react"
import Clock from 'src/pages/general/widgets/clock'
import Date from 'src/pages/general/widgets/clock/date'
import { useHistory } from 'react-router-dom'
import SpotifySongBgGradient from './widgets/songBgGradient'
import SpotifyLogo from './widgets/logo/logo'
import { SpotifyContext } from 'src/components/spotify'

export default function SpotifyScreen(props: FlexProps) {
    const { item, cover } = useContext(SpotifyContext)

    return <Flex
        {...props}
        w='100%'
        h='100%'
        flexDir='column'
        alignItems='center'
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
            <SpotifySongBgGradient w='80%' h='80%' rounded='xl'>
                <Flex w='100%'>
                </Flex>
            </SpotifySongBgGradient>
        </Flex>
    </Flex>
}