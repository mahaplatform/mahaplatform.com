import { app, ipcMain, BrowserWindow } from 'electron'

class Main {

  main = null
  window = null

  _handleCertificateError = this._handleCertificateError.bind(this)
  _handleInit = this._handleInit.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handleSetBadgeCount = this._handleSetBadgeCount.bind(this)

  constructor() {
    app.setName('The Maha Platform')
    app.on('ready', this._handleInit)
    app.on('certificate-error', this._handleCertificateError)
    ipcMain.on('openWindow', this._handleOpenWindow)
    ipcMain.on('setBadgeCount', this._handleSetBadgeCount)
  }

  _handleCertificateError(event, webContents, url, error, certificate, callback) {
    event.preventDefault()
    callback(true)
  }

  _handleInit() {
    this.main = new BrowserWindow({
      width: 1024,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    })
    this.main.loadFile('index.html')
  }

  _handleOpenWindow(e, url) {
    this.window = new BrowserWindow({
      width: 520,
      height: 840
    })
    this.window.loadURL(url, { userAgent: 'Chrome' })
  }

  _handleSetBadgeCount(e, count) {
    app.setBadgeCount(count)
  }

}

const main = new Main()
