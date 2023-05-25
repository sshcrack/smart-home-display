import { contextBridge, ipcRenderer } from 'electron'
import log from "electron-log"
import weather from "./weather"
import spotify from "./spotify"

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

export const API = {
    weather,
    spotify,
    isPackaged: () => ipcRenderer.sendSync("is_packaged") as boolean
}

contextBridge.exposeInMainWorld(
    "api",
    API
)

log.transports.file.maxSize = 1024 * 1024 * 20
contextBridge.exposeInMainWorld(
    "log",
    log
)