import { Flex, FlexProps } from '@chakra-ui/react';
import { useContext } from 'react';
import { SpotifyContext } from 'src/components/spotify';
import React from "react"

export default function SpotifySongBgGradient({ children, ...props }: FlexProps) {
    const { item } = useContext(SpotifyContext)

    const defaultVal = { red: 255, green: 255, blue: 255 }

    const p0 = item?.palette?.[0] ?? defaultVal
    const bgColor = `rgba(${p0.red}, ${p0.green}, ${p0.blue}, .3)`

    return <Flex
        background={`linear-gradient(to bottom, ${bgColor} 40%, rgba(255, 255, 255, .05) 100%)`}
        {...props}
    >
        {children}
    </Flex>
}