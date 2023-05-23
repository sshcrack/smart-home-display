export interface ConfigInterface {
    weather: {
        location: string,
        apiKey: string,
        lang?: string
    },
    unsplash: {
        accessKey: string,
        secretKey: string
    }
}