import Store from "electron-store"

const store = new Store({
    defaults: {
        accessToken: null as string,
        refreshToken: null as string
    }
})

export default store;