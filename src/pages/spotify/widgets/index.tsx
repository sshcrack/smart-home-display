import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import React from "react"
import "./styles.css"
import { SpotifyContext } from 'src/components/spotify';
import { getSpotifyImg } from 'src/utils/spotify';

export default function SpotifyWidget() {
    const { isPlaying, item } = useContext(SpotifyContext)
    if (!item)
        return <></>


    const image = getSpotifyImg(item)
    const { hex } = item.palette?.[0] ?? {}
    return item && <Flex
        style={{ "--backdrop-color": hex } as any}
        alignItems='center'
        justifyContent='center'
        className='spotify'
        rounded='xl'
        gap='5'
    >
        <Box
            className='cover'
        >
            <Image
                src={image.url}
                w='10rem'
                h='10rem'
                rounded='xl'
            />
        </Box>

        <Flex flexDir='column' className='text'>
            <Text fontSize='3xl'>{item.name}</Text>
            {
                item.type === "track" &&
                <Text fontSize='xl'>{item.artists[0].name}</Text>
            }
        </Flex>
    </Flex>
}