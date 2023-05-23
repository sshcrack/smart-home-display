import { Box, Flex, FlexProps, Grid, HTMLChakraProps } from '@chakra-ui/react';
import React from "react";
import Clock from './widgets/clock';
import Weather from './widgets/weather';
import BackgroundManager from 'src/backgrounds/BackgroundManager';

export default function App() {
    const stackedOnTop = {
        gridColumn: "1 / 1",
        gridRow: "1 / 1"
    } as HTMLChakraProps<"div">

    return <Grid
        w='100%'
        h='100%'
        placeItems='center'
    >
        <BackgroundManager {...stackedOnTop} />
        <Flex
            {...stackedOnTop}

            w='100%'
            h='100%'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
        >
            {/*}
            <Clock />
            <Weather />
*/}
        </Flex>
    </Grid>
}