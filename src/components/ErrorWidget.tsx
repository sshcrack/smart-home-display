import { Flex, Text } from '@chakra-ui/react';
import React from "react"

export default function ErrorWidget({ error }: { error: string}) {
    return <Flex flexDir='column'>
        <Text fontSize='md'>Oh no an error occurred!</Text>
        <Text fontSize='sm'>{error}</Text>
    </Flex>
}