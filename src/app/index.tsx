import { Flex, Heading } from '@chakra-ui/react';
import Clock from './widgets/clock';
import Weather from './widgets/weather';

export default function App() {
    return <Flex
        w='100%'
        h='100%'
        justifyContent='center'
        alignItems='center'
        flexDir='column'
    >
        <Clock />
        <Weather />
    </Flex>
}