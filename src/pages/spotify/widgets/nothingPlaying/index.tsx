import { Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import React from "react"
import vinylImg from "../../../../assets/img/vinyl.png"
import { motion } from "framer-motion"

export default function SpotifyNothingPlaying(props: Omit<FlexProps, "children">) {
    return <Flex {...props}
        justifyContent='center'
        alignItems='center'
        padding='5'
        gap='3'
    >
        <motion.img
            initial={{ transform: "rotate(0deg)" }}
            animate={{ transform: "rotate(360deg)" }}
            transition={{
                repeatType: "loop",
                repeat: Infinity,
                ease: "linear",
                duration: 10
            }}
            src={vinylImg}
            style={{
                width: '7.5rem',
                objectFit: 'contain'
            }}
        />
        <Text fontSize='4xl'>Noting is playing</Text>
    </Flex>
}