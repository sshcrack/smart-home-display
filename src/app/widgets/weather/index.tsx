import { Flex, Image, Text } from '@chakra-ui/react';
import { useFetch } from 'usehooks-ts';
import ErrorWidget from '../../../components/ErrorWidget';
import { WEATHER_NOW_URL, weatherCodeToUrl } from './consts';
import { CurrentWeather } from './interface';
import React from "react"

export default function Weather() {
    const { data, error } = useFetch<CurrentWeather>(WEATHER_NOW_URL)
    const currWeather = data?.weather?.[0];
    const iconUrl = currWeather && weatherCodeToUrl(currWeather.icon)

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
                <Image src={iconUrl} />
                <Text>{currWeather.description}</Text>
            </Flex>
        </>

    const errorWidgets = error && <ErrorWidget error={error.message} />
    return <Flex>
        {error ? errorWidgets : dataWidgets}
    </Flex>
}