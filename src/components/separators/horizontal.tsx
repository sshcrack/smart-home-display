import { Box, BoxProps } from '@chakra-ui/react';
import React from "react"

export default function HorizontalSeparator(props: BoxProps) {
    return <Box w='1px' h='100%' bg='currentColor' {...props}/>
}