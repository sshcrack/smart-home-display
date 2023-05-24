import { Flex, FlexProps } from '@chakra-ui/react'
import React from "react"
import Clock from 'src/pages/widgets/clock'
import Date from 'src/pages/widgets/clock/date'
import SpotifyWidget from './widgets'

export default function SpotifyScreen(props: FlexProps) {
    return <Flex
        {...props}

        w='100%'
        h='100%'
        flexDir='column'
        alignItems='center'
    >
        <Flex
            p='5'
            flexDir='column'
            borderBottomRightRadius='xl'
            backdropFilter='blur(10px)'
            alignSelf='start'
            bg='rgba(0,0,0,0.001)'
        >
            <Date size='2.5rem' short />
            <Clock size='2.5rem' />
        </Flex>
        <Flex
            flex='1'
            w='100%'
            h='100%'
            justifyContent='center'
            alignItems='center'
        >
            <SpotifyWidget />
        </Flex>
    </Flex>
}