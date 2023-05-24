import { Flex, FlexProps } from '@chakra-ui/react'
import React from "react"
import Clock from 'src/pages/widgets/clock'
import Date from 'src/pages/widgets/clock/date'
import Weather from 'src/pages/widgets/weather'
import HorizontalSeparator from 'src/components/separators/horizontal'
import SpotifyProvider from 'src/components/spotify'

export default function SpotifyScreen(props: FlexProps) {
    return <Flex
        {...props}

        w='100%'
        h='100%'
        flexDir='column'
        alignItems='center'
    >
        <Flex
        w='100%'
        pt='5'
        pb='5'
        justifyContent='center'
        bg='rgba(0,0,0,0.25)'
        backdropFilter='blur(20px)'
        >
            <Clock size='2.5rem' />
        </Flex>
        <SpotifyProvider />
    </Flex>
}