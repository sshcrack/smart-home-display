import { Flex, Image, Text } from '@chakra-ui/react'
import { Hourly } from './interface'
import { WeatherCodeDescription } from './codes'

export type WeatherIconProps =  {
    data: Hourly,
    index: number
}

export default function WeatherDesc({ data, index }: WeatherIconProps) {
    const code = data.weathercode[index]
    const isDay = data.is_day[index] === 1

    const desc = WeatherCodeDescription[code]
    const {image, description} = isDay ? desc.day : desc.night
    return <Flex alignItems='center' justifyContent='center'>
        <Image src={image} w='5em' h='5em' />
        <Text>
            {description}
        </Text>
    </Flex>
}