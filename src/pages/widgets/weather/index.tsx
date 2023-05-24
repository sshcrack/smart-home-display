import { Flex, Image, Text } from '@chakra-ui/react';
import { useFetch } from 'usehooks-ts';
import ErrorWidget from '../../../components/ErrorWidget';
import { WEATHER_NOW_URL, weatherCodeToUrl } from '../../../backend/weather/consts';
import { CurrentWeather } from '../../../backend/weather/interface';
import React, { useEffect, useState } from "react"
import Widget from '..';
import config from 'src/config';

export type WeatherProps = {
    showDesc?: boolean,
    size?: string
}

export default function Weather({ showDesc, size = "3.5rem" }: WeatherProps) {
    const [data, setData] = useState<CurrentWeather>(null)
    const [error, setError] = useState<Error>(null)
    const { weather } = window.api

    useEffect(() => {
        const onUpdate = () => weather.now()
            .then(e => {
                setData(e)
                setError(null)
            })
            .catch(e => {
                setData(null)
                setError(e)
            })

        onUpdate()
        const id = setInterval(() => {
            onUpdate()
        }, config.weather.updateInterval)

        return () => clearInterval(id)
    }, [])

    const currWeather = data?.weather?.[0];
    const iconUrl = currWeather && weatherCodeToUrl(currWeather.icon)

    const fontSize = `calc(${size} / 2)`
    const dataWidgets = data == null ?
        <Text>
            Loading
        </Text>
        :
        <>
            <Flex
                justifyContent='center'
                alignItems='center'
            >
                <Image src={iconUrl} boxSize={size} />
                <Text as='span' fontSize={fontSize}>
                    {Math.round(data.main.temp)}°
                </Text>
                {showDesc && <Text fontSize={fontSize} color='white'>{currWeather.description}</Text>}
            </Flex>
        </>

    const errorWidgets = error && <ErrorWidget error={error.message} />
    return <>
        {error ? errorWidgets : dataWidgets}
    </>
}