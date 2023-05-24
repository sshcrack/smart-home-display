import { Box, Flex, FlexProps, Grid, HTMLChakraProps } from '@chakra-ui/react';
import React from "react";
import BackgroundManager from 'src/components/backgrounds/BackgroundManager';
import StartScreen from 'src/pages/idle';
import SpotifyScreen from './spotify';

import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";

export default function App() {
    //@ts-ignore
    return <Router>
        <Switch>
            <Route path="*">
                <InnerApp />
            </Route>
        </Switch>
    </Router>
}

export function InnerApp() {
    let location = useLocation();

    console.log("Loc", location)
    const stackedOnTop = {
        gridColumn: "1 / 1",
        gridRow: "1 / 1"
    } as HTMLChakraProps<"div">

    return <Grid
        w='100%'
        h='100%'
        placeItems='center'
        color='white'
    >
        <BackgroundManager {...stackedOnTop} />
        <TransitionGroup style={{gridColumn: "1 / 1", gridRow: "1 / 1", width: "100%", height: "100%"}}>
            <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={300}
            >
                <Switch location={location}>
                    <Route exact path="/" children={<StartScreen {...stackedOnTop} />} />
                    <Route path="/spotify" children={<SpotifyScreen {...stackedOnTop} />} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </Grid>
}