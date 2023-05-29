import { Duration } from 'luxon';
import { useContext } from 'react';
import { SpotifyContext } from 'src/components/spotify';
import config from 'src/config';
import React from "react"
import "./styles.css"
import { Flex, FlexProps, Progress, Text } from '@chakra-ui/react';
import { paletteColorToCss } from 'src/utils/color';

const { locale } = config.clock
export default function TrackProgressBar(props: Omit<FlexProps, "children">) {
    const { item, progressMs } = useContext(SpotifyContext)
    if (!item)
        return <></>

    const progress = Duration.fromMillis(progressMs, { locale })
    const duration = Duration.fromMillis(item.duration_ms, { locale })
    const format = duration.shiftTo("hours", "minutes", "seconds").get("hours") === 0 ? "mm:ss" : "hh:mm:ss"

    const hasColor = item?.palette?.[1]
    const { hue, saturation, lightness } = item.palette?.[1] ?? {}
    const getProgColor = (e: number) => hasColor && paletteColorToCss(hue, saturation, e)

    const offset = .15

    const basicLightness = Math.max(.7, lightness)
    const gradientEnd = basicLightness + offset > 1 ? basicLightness - offset : basicLightness + offset

    const progColor = getProgColor(basicLightness)
    const endColor = getProgColor(gradientEnd)
    return <Flex {...props} flexDir='column'>
        <Progress
            value={progressMs}
            rounded='full'
            className='progress'
            style={{ "--prog-color": progColor, "--prog-color-end": endColor } as any}
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
}