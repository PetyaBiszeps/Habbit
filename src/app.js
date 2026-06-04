const {app, BrowserWindow} = require('electron');
const path = require('node:path');

const rendererDevUrl = process.env.VITE_DEV_SERVER_URL;

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        icon: "src/assets/ico/Icon.png",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (rendererDevUrl) {
        mainWindow.loadURL(rendererDevUrl);
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/renderer/index.html'));
    }

    //mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
