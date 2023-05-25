import { Flex, FlexProps } from '@chakra-ui/react';
import React from "react"

export type WidgetProps = FlexProps

export default function Widget({ children, ...props }: WidgetProps) {
    /*
    
        bg='rgba(0,0,0,.1)'
        backdropFilter='blur(20px)'
        rounded='2xl'
        flexDir='column'
        alignItems='center'
        */
    return <Flex
        flexDir='column'
        alignItems='center'
        {...props}
    >
        {children}
    </Flex>
}