import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { SpotifyContext } from 'src/components/spotify';
import { getSpotifyImg } from 'src/utils/spotify';
import SpotifyDevice from './device';
import SpotifyLogo from './logo/logo';
import TrackProgressBar from './progressBar';
import "./styles.css";
import SpotifySongBgGradient from './songBgGradient';

export default function SpotifyHomeWidget() {
    const history = useHistory()
    const { item, cover } = useContext(SpotifyContext)
    if (!item)
        return <></>


    return item && <SpotifySongBgGradient
        rounded='xl'
        w='40rem'
        h='13rem'
        gap='5'
        backdropFilter='blur(10px)'
        onClick={() => history.push("/spotify")}
    >
        <Box
            className='cover'
            h='13rem'
            aspectRatio='1 / 1'
        >
            <Image
                src={cover.url}
                w='100%'
                h='100%'
                rounded='xl'
                roundedBottomRight='none'
                roundedTopRight='none'
            />
        </Box>

        <Flex
            flexDir='column'
            h='auto'
            flex='1'
            p='3'
            pl='0'
            justifyContent='space-between'
        >
            <SpotifyLogo flex='0' />
            <Flex flexDir='column' w='100%' gap='3'>
                <Flex
                    flexDir='column'
                    flex='1'
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
                <TrackProgressBar flex='0' w='100%' />
            </Flex>
            <SpotifyDevice
                flex='0'
            />
        </Flex>
    </SpotifySongBgGradient>
}