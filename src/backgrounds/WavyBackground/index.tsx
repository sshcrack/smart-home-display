import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from "react"
import { WavyCanvasManager } from './canvasManager'

export type WavyBackgroundProps = {
    bgColor: string,
    colorSchema: string[]
    numOfLayers: number
}

// thanks to https://codepen.io/trajektorijus/pen/mdeBYrX
export default function WavyBackground(config: WavyBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>()
    const [ manager, setManager] = useState<WavyCanvasManager>(null)

    useEffect(() => {
        if (canvasRef.current == null)
            return;

        const curr = canvasRef.current
        setManager(new WavyCanvasManager(curr, config))

        return () => {
            manager.destroy();
            setManager(null)
        }
    }, [canvasRef])

    return <Flex w='100%' h='100%' bg='red.100'>
        <canvas ref={canvasRef} />
    </Flex>
}