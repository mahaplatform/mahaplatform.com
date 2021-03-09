import { app, ipcMain, systemPreferences, BrowserWindow, Menu } from 'electron'
import _ from 'lodash'

class Main {

  main = null
  session = null
  window = null

  _handleCertificateError = this._handleCertificateError.bind(this)
  _handleInit = this._handleInit.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handleSetBadgeCount = this._handleSetBadgeCount.bind(this)

  constructor() {
    app.setName('Maha')
    app.on('ready', this._handleInit)
    app.on('certificate-error', this._handleCertificateError)
    ipcMain.on('openWindow', this._handleOpenWindow)
    ipcMain.on('setBadgeCount', this._handleSetBadgeCount)

  }

  _getMenuTemplate() {
    const menu = []
    menu.push({
      label: 'Maha',
      submenu: [
        { label: `Version ${app.getVersion()}` },
        { label: 'Developer', role: 'toggledevtools' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: app.quit
        }
      ]
    })
    return menu
  }

  _handleCertificateError(event, webContents, url, error, certificate, callback) {
    event.preventDefault()
    callback(true)
  }

  _handleInit() {
    const template = this._getMenuTemplate()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    this.main = new BrowserWindow({
      width: 1024,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    this.main.loadFile('index.html')
    this.session = this.main.webContents.session
    this.session.setPermissionRequestHandler((webContents, permission, callback, details) => {
      const { mediaTypes } = details
      if(permission === 'media' && _.includes(mediaTypes, 'audio')) {
        systemPreferences.askForMediaAccess('microphone').then((allowed) => {
          return callback(allowed)
        }).catch(err => {
          console.log({ err })
        })
      }
    })

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

new Main()
