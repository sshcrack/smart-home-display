import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { MdComputer } from 'react-icons/md';
import { SpotifyContext } from 'src/components/spotify';
import React from "react"

export default function SpotifyDevice(props: Omit<FlexProps, "children">) {
    const { listeningOn } = useContext(SpotifyContext)
    if (!listeningOn)
        return <></>


    return <Flex alignItems='center' gap='2' {...props}>
        <MdComputer size='1.75rem' />
        <Text>Listening on {listeningOn.name}</Text>
    </Flex>
}