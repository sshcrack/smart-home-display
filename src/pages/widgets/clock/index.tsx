import { Box, Flex, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from "react"
import config from 'src/config'
import Widget from '..'

const configClock = config.clock
export type ClockProps = {
    size?: string,
    showSeconds?: boolean
}

export default function Clock({ size = "6rem", showSeconds }: ClockProps) {
    const [, setUpdate] = useState(0)
    const now = DateTime.local({ zone: configClock.zone, locale: configClock.locale })

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdate(Math.random())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return <Widget>
        <Text
            fontSize={size}
            lineHeight='.9'
        >
            {now.toFormat("HH:mm")}
            {showSeconds && <Text
                fontSize={`calc(${size} / 2)`}
                color='whiteAlpha.700'
                verticalAlign='revert'
                as='sup'
            >{now.toFormat("ss")}</Text>}
        </Text>
    </Widget>
}