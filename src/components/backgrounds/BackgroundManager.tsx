import React from "react"
import WavyBackground from './WavyBackground'
import { BoxProps, Flex } from '@chakra-ui/react'
import chroma from 'chroma-js'

export default function BackgroundManager(props: BoxProps) {
    return <Flex {...props} w='100%' h='100%' zIndex='-100'>
        <WavyBackground
            bgColor={chroma.hsl(230, 0.5, 0.92).hex()}
            // https://www.colourlovers.com/palette/577622/One_Sixty-Eight
            colorSchema={[
                '#5E9FA3',
                '#DCD1B4',
                '#FAB87F',
                '#F87E7B',
                '#B05574',
            ]}
            numOfLayers={5}
            speed={.15}
        />
    </Flex>
}