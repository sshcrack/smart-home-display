import { Flex, FlexProps } from '@chakra-ui/react'
import React from "react"
import Clock from 'src/pages/general/widgets/clock'
import Date from 'src/pages/general/widgets/clock/date'
import Weather from 'src/pages/home/widgets/weather'
import HorizontalSeparator from 'src/components/separators/horizontal'
import SpotifyHomeWidget from '../spotify/widgets'
import config from 'src/config'

const spotifyDisabled = config.spotify.disabled
export default function StartScreen(props: FlexProps) {
    return <Flex
        {...props}
        w='100%'
        h='100%'
        flexDir='column'
        p='5'
    >
        <Flex
            flex='1'
            className='content'
            justifyContent='center'
            alignItems='center'
        >
            {!spotifyDisabled && <SpotifyHomeWidget />}
        </Flex>
        <Flex
            flexDir='column'
            justifyContent='flex-end'
            alignItems='flex-start'
            flex='0'
        >
            <Flex alignItems='center' gap='3'>
                <Weather />
                <HorizontalSeparator h='50%' />
                <Date short />
            </Flex>
            <Clock size='7rem' />
        </Flex>
    </Flex>
}