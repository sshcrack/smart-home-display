import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext } from "react"
import { SpotifyContext } from 'src/components/spotify';

export default function PlayerHeader() {
    const { item, cover } = useContext(SpotifyContext)
    return <Flex w='100%' gap='5'>
        <Box w='10rem' aspectRatio='1/1'>
            <Image src={cover.url} rounded='xl' />
        </Box>
        <Flex
            flexDir='column'
            flex='1'
            justifyContent='center'
        >
            <Text
                fontSize='3xl'
                className='text-two-lines'
                maxHeight='5rem'
                lineHeight='1'
            >{item.name}</Text>
            {
                item.type === "track" &&
                <Text
                    fontSize='xl'
                    className='text-one-line'
                    textOverflow='ellipsis'
                >{item.artists?.[0].name}</Text>
            }
        </Flex>
    </Flex>
}