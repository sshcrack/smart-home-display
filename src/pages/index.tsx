import { Box, Flex, FlexProps, Grid, HTMLChakraProps } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import BackgroundManager from 'src/components/backgrounds/BackgroundManager';
import StartScreen from 'src/pages/home';
import SpotifyScreen from './spotify';
import "./fade.css"

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
import SpotifyProvider from 'src/components/spotify';
import config from 'src/config';

const spotifyDisabled = config.spotify.disabled
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
    const [isPackaged, setPackaged] = useState(false)
    useEffect(() => setPackaged(window.api.isPackaged()), [])

    const stackedOnTop = {
        gridColumn: "1 / 1",
        gridRow: "1 / 1"
    } as HTMLChakraProps<"div">

    const onTopTransition: FlexProps = {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
    return <Grid
        w='100%'
        h='100%'
        placeItems='center'
        color='white'
        cursor={isPackaged ? "none" : "inherit"}
    >
        <SpotifyProvider>
            <BackgroundManager {...stackedOnTop} />
            <TransitionGroup style={{ gridColumn: "1 / 1", gridRow: "1 / 1", width: "100%", height: "100%", position: 'relative' }}>
                <CSSTransition
                    key={location.pathname}
                    classNames="fade"
                    timeout={1000}
                >
                    <Switch location={location}>
                        <Route exact path="/" children={<StartScreen {...onTopTransition} />} />
                        {!spotifyDisabled && <Route path="/spotify" children={<SpotifyScreen {...onTopTransition} />} />}
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </SpotifyProvider>
    </Grid>
}