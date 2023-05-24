import { Flex, FlexProps } from '@chakra-ui/react'
import React from "react"
import Clock from 'src/pages/widgets/clock'
import Date from 'src/pages/widgets/clock/date'
import Weather from 'src/pages/widgets/weather'
import HorizontalSeparator from 'src/components/separators/horizontal'

export default function StartScreen(props: FlexProps) {
    console.log("Start")
    return <Flex
        {...props}

        w='100%'
        h='100%'
        flexDir='column'
        justifyContent='flex-end'
        alignItems='flex-start'
        p='5'
    >
        <Flex alignItems='center' gap='3'>
            <Weather />
            <HorizontalSeparator h='50%' />
            <Date short/>
        </Flex>
        <Clock size='7rem' />
    </Flex>
}