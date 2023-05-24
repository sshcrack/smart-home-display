import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from "react"
import { WavyCanvasManager } from './canvasManager'

export type WavyBackgroundProps = {
    bgColor: string,
    colorSchema: string[]
    numOfLayers: number,
    speed?: number
}

// thanks to https://codepen.io/trajektorijus/pen/mdeBYrX
export default function WavyBackground(config: WavyBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>()
    const [ manager, setManager] = useState<WavyCanvasManager>(null)

    useEffect(() => {
        if (canvasRef.current == null)
            return;

        const curr = canvasRef.current
        const mrg = new WavyCanvasManager(curr, config)
        setManager(mrg)

        const l = () => mrg.setupVariables()
        window.addEventListener("resize", l)

        return () => {
            manager.destroy();
            window.removeEventListener("resize", l)
            setManager(null)
        }
    }, [canvasRef])

    return <Flex w='100%' h='100%' bg='red.100'>
        <canvas ref={canvasRef} />
    </Flex>
}