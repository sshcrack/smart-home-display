import { app, BrowserWindow, ipcMain } from 'electron';
import registerFuncs from './backend/registerFuncs';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
require('source-map-support').install();
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const packaged = app.isPackaged
  console.log("Packaged", app.isPackaged)

  const mainWindow = new BrowserWindow({
    height: 480,
    width: 800,
    fullscreen: packaged,
    resizable: false,
    maximizable: false,
    kiosk: packaged,
    x: 2475,
    darkTheme: true,
    y: 70,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false
    },
    alwaysOnTop: packaged,
    frame: !packaged
  });

  mainWindow.setMenuBarVisibility(false && true)
  if(!packaged)
    mainWindow.webContents.openDevTools({ mode: "undocked"})
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


registerFuncs.map(e => e())

ipcMain.on("is_packaged", e => e.returnValue = app.isPackaged)