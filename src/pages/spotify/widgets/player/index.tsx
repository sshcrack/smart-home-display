import { Flex, FlexProps } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from "react";
import { IconBaseProps } from 'react-icons';
import { IoIosPause, IoIosPlay, IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { SpotifyContext } from 'src/components/spotify';
import { paletteColorToCss } from 'src/utils/color';
import TrackProgressBar from '../progressBar';
import PlayerHeader from './header';

export default function SpotifyPlayer(props: Omit<FlexProps, "children">) {
    const { isPlaying, item, update } = useContext(SpotifyContext)
    const { spotify } = window.api

    const [isPlayingLocal, setIsPlayingLocal] = useState(isPlaying)
    useEffect(() => setIsPlayingLocal(isPlaying), [isPlaying])


    const { hue, lightness, intensity } = item?.palette?.[2] ?? { hue: 0, lightness: 100, intensity: 100 }

    useEffect(() => {
        return spotify.addUpdateListener(() => {
            update()
            console.log("Received update")
        })
    }, [])

    const firstColor = paletteColorToCss(hue, intensity, Math.max(0.7, lightness), .65)
    const gradient = item?.palette && `linear-gradient(to bottom right, ${firstColor}, rgba(255, 255, 255, 0.1))`
    const iconProps: IconBaseProps = {
        style: {
            width: "3em",
            height: "3em",
            padding: "var(--chakra-space-3)",
            borderRadius: "var(--chakra-radii-xl)",
            background: gradient
        }
    }
    return <Flex
        {...props}
        p='8'
        gap='3'
        flexDir='column'
        justifyContent='space-around'
    >
        <PlayerHeader />
        <Flex w='100%' h='100%' flexDir='column' gap='3'>
            <Flex w='100%' justifyContent='center' alignItems='center' gap='5'>
                <IoIosSkipBackward {...iconProps} onClick={() => spotify.backward()} />
                {isPlayingLocal ?
                    <IoIosPause {...iconProps} onClick={() => { spotify.pause(); setIsPlayingLocal(false) }} /> :
                    <IoIosPlay {...iconProps} onClick={() => { spotify.play(); setIsPlayingLocal(true) }} />}
                <IoIosSkipForward {...iconProps} onClick={() => spotify.skip()} />
            </Flex>
            <TrackProgressBar w='100%' />
        </Flex>
    </Flex>
}