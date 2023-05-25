import { Box, Flex, Grid, Image, Progress, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaSpotify } from "react-icons/fa"
import { MdComputer } from "react-icons/md"
import React from "react"
import "./styles.css"
import { SpotifyContext } from 'src/components/spotify';
import { getSpotifyImg } from 'src/utils/spotify';
import { Duration } from 'luxon';
import config from 'src/config';

const locale = config.clock.locale;
export default function SpotifyWidget() {
    const { isPlaying, item, progressMs, listeningOn } = useContext(SpotifyContext)
    if (!item)
        return <></>


    const progress = Duration.fromMillis(progressMs, { locale })
    const duration = Duration.fromMillis(item.duration_ms, { locale })
    const format = duration.shiftTo("hours", "minutes", "seconds").get("hours") === 0 ? "mm:ss" : "hh:mm:ss"
    //@ts-ignore
    window.e = duration;

    const image = getSpotifyImg(item)
    const { red, green, blue } = /*item.palette?.[0] ??*/ { red: 255, green: 255, blue: 255 }
    const bgColor = `rgba(${red}, ${green}, ${blue}, .3)`
    return item && <Flex
        background={`linear-gradient(to bottom, ${bgColor} 40%, rgba(255, 255, 255, .05) 100%)`}
        rounded='xl'
        w='40rem'
        h='13rem'
        gap='5'
        backdropFilter='blur(10px)'
    >
        <Box
            className='cover'
            h='13rem'
            aspectRatio='1 / 1'
        >
            <Image
                src={image.url}
                w='100%'
                h='100%'
                rounded='xl'
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
            <Flex flex='0' alignItems='center' gap='2'>
                <FaSpotify
                    size='1.75rem'
                    color='#1ed760'
                    className='logo'
                />
                <Text fontSize='xl'>Spotify</Text>
            </Flex>
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
                        >{item.artists[0].name}</Text>
                    }
                </Flex>
                <Flex flex='0' w='100%' flexDir='column'>
                    <Progress
                        value={progressMs}
                        rounded='full'
                        className='progress'
                        backdropFilter='blur(20px)'
                        bg='rgba(127,127,127,.75)'
                        max={item.duration_ms}
                        w='100%'
                    />
                    <Flex
                        justifyContent='space-between'
                        w='100%'
                    >
                        <Text>{progress.toFormat(format)}</Text>
                        <Text>{duration.toFormat(format)}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                flex='0'
                alignItems='center'
                gap='2'
            >
                <MdComputer size='1.75rem' />
                <Text>Listening on {listeningOn.name}</Text>
            </Flex>
        </Flex>
    </Flex>
}