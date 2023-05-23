import { Flex, Text } from '@chakra-ui/react';
import { useFetch } from 'usehooks-ts';
import { WEATHER_OVERVIEW_URL } from './consts';
import { Hourly, WeatherOverviewType } from './interface';
import WeatherDesc from './WeatherIcon';
import ErrorWidget from '../../../components/ErrorWidget';

export default function Weather() {
    const { data, error } = useFetch<WeatherOverviewType>(WEATHER_OVERVIEW_URL)
    const hourly = data?.hourly;
    const currIndex = hourly ? getCurrentIndex(hourly) : -1

    const dataWidgets = data == null ?
        <Text>
            Loading
        </Text>
        :
        <>
            <WeatherDesc data={hourly} index={currIndex}></WeatherDesc>
        </>

        const errorWidgets = error && <ErrorWidget error={error.message} />
    return <Flex>
        {error ? errorWidgets : dataWidgets}
    </Flex>
}

function getCurrentIndex(data: Hourly) {
    const now = Date.now()
    const dates = data.time.map((e, i) => {
        return {
            millis: new Date(e).getTime(),
            index: i
        }
    })

    let nearest = Number.MAX_SAFE_INTEGER
    let nearestEntry = null as number;
    dates.forEach(curr => {
        const diff = Math.abs(now - curr.millis)
        if(nearest <= diff)
            return;

        nearest = diff
        nearestEntry = curr.index
    })

    return nearestEntry
}