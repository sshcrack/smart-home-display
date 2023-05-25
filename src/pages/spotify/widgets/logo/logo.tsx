import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { FaSpotify } from 'react-icons/fa';
import React from "react"
import "./styles.css"

export default function SpotifyLogo({ children, ...props }: FlexProps) {
    return <Flex alignItems='center' gap='2' {...props}>
        <FaSpotify
            size='1.75rem'
            color='#1ed760'
            className='logo'
        />
        <Text fontSize='xl'>Spotify</Text>
        {children}
    </Flex>
}