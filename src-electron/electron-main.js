import { app, BrowserWindow, ipcMain,Notification ,clipboard,dialog} from 'electron'
import path from 'path'
import os from 'os'
import { menu } from './menu'
const loadingURL = `file://${__dirname}/../../public/loader.html`
import Server from './server/index'
// needed in case process is undefined under Linux
const platform = process.platform || os.platform()
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV == 'development') {

  global.__static = require('path')
      .join(__dirname, '/public')
      .replace(/\\/g, '\\\\')
}

let mainWindow
function loadingWindow() {
  console.log('loadingWindow')
  loadWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    backgroundColor: '#222',
    skipTaskbar: true,
    transparent: true,
    titleBarStyle: 'hiddenInset',
    resizable: false,
    webPreferences: { experimentalFeatures: true }
  })
  console.log(loadingURL)
  loadWindow.loadURL(loadingURL)

  loadWindow.show()
 // menu.initMenu()

}
function onAppReady() {
  console.log('onAppReadyonAppReadyonAppReadyonAppReadyonAppReady')
  loadingWindow()
  setTimeout(() => {
    try {
      const serveStatus =  Server.StatrServer()
      console.log(serveStatus) 
    } catch (error) {
      dialog.showErrorBox(
        'erreur',
        error
      )
    }
    createWindow()
  }, 2000)

  loadWindow.on('closed', () => {
    loadWindow = null
  })
}


function createWindow() {
  /**
   * Initial window options
   */
  console.log('createWindow')
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })
console.log(process.env.APP_URL)
  mainWindow.loadURL(process.env.APP_URL)
  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      //mainWindow.webContents.closeDevTools()
    })
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.webContents.once('dom-ready', () => {
    console.log('dom-ready')
   
    mainWindow.maximize()
    mainWindow.show()
    loadWindow.destroy()
  })

  mainWindow.on('maximize', () => {
    console.log('maximize')
    mainWindow.webContents.send("w-max", true)
  })
  mainWindow.on('unmaximize', () => {
    console.log('unmaximize')
    mainWindow.webContents.send("w-max", false)
  })
}


ipcMain.handle('subscribe', async() => {
  const index = await dialog.showMessageBox({
    type: 'info',
    buttons: ['ok', 'anuuler'],
    title: '有新版本，建议您立即升级',
    message: `sqxsqsx`,
    noLink: true
  })
  // 订阅专属频道
  if (!Notification.isSupported()) return
  console.log(index)


      let notification = new Notification({
          title: "data.app ? data.app : data.title",
          subtitle: "sss",
          body: "data.content"+index.response,
          silent: true
      })
      notification.show()
      clipboard.writeText('data.contllllll lllllllll lllllllllllent')
})


ipcMain.handle('window-close', (event, args) => {
  BrowserWindow.fromWebContents(event.sender)?.close()
})
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})
app.whenReady().then(() => {
  console.log('whenReady activate')
  onAppReady()
})
app.on('activate', () => {
  console.log('activate')
  if (mainWindow === null) {
    onAppReady()
  }
})
