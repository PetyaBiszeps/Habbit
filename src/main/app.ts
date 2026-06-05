import { app, BrowserWindow } from 'electron'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const rendererDevUrl = process.env.VITE_DEV_SERVER_URL

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    icon: rendererDevUrl
      ? path.join(process.cwd(), 'src/renderer/assets/ico/Icon.png')
      : path.join(__dirname, '../../renderer/ico/Icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (rendererDevUrl) {
    mainWindow.loadURL(rendererDevUrl)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../renderer/index.html'))
  }

  //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
