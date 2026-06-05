import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {
  BrowserWindow
} from 'electron'

// Constants
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    icon: path.join(process.cwd(), 'public/favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    await mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // mainWindow.webContents.openDevTools() --> If needed
}
