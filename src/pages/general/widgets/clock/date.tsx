import { Text, TextProps } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import config from 'src/config'

export type DateProps = {
    short?: boolean,
    noYear?: boolean
} & TextProps

const configClock = config.clock
export default function Date({ short, noYear, size, ...props }: DateProps) {
    const [, setUpdate] = useState(0)
    const now = DateTime.local({ zone: configClock.zone, locale: configClock.locale })

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdate(Math.random())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    let shortFormat = "ccc, MMM MM"
    shortFormat += !noYear && " yyyy"
    return <Text
        fontSize={size ?? "xl"}
        {...props}
    >{now.toFormat(short ? shortFormat : "DDDD")}</Text>
}