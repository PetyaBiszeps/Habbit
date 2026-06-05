import createWindow from '@/main/createWindow.ts'
import { createRequire } from 'node:module'
import {
  app,
  BrowserWindow
} from 'electron'

const require = createRequire(import.meta.url)

if (require('electron-squirrel-startup')) {
  app.quit()
}

app.whenReady().then(async () => {
  await createWindow()

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
