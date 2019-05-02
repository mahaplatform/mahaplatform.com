const electron = require('electron')
const { autoUpdater } = require('electron-updater')
const receiver = require('electron-push-receiver')
const logger = require('electron-log')
const URL = require('url')

const windows = {}
let initialized = false

autoUpdater.logger = logger
autoUpdater.logger.transports.file.level = 'info'
autoUpdater.autoInstallOnAppQuit = true

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates')
})

autoUpdater.on('update-available', (info) => {
  console.log('Update available')
  sendMessage('setUpdate', {
    version: info.version
  })
})

autoUpdater.on('update-not-available', () => {
  console.log('Update not available')
})

autoUpdater.on('download-progress', (progress) => {
  sendMessage('setProgress', {
    progress: Math.floor(progress.percent)
  })
  console.log(`Progress ${Math.floor(progress.percent)}`)
})

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded')
  sendMessage('setUpdateReady')
})

autoUpdater.on('error', (error) => {
  console.log(error)
})

electron.app.setName('The Maha Platform')

electron.app.setAsDefaultProtocolClient('maha')

electron.app.on('ready', () => {

  initialized = true

  // autoUpdater.checkForUpdates()

  createWindow()

})

electron.app.on('open-url', (event, url) => {

  event.preventDefault()

  if(initialized && windows.main) return pushRoute(url)

  if(initialized) createWindow(url)

  setTimeout(() => {
    return pushRoute(url)
  }, 1500)

})

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
})

electron.app.on('page-title-updated', (e) => {
  e.preventDefault()
})

electron.app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

electron.ipcMain.on('message', receiveMessage)

function createWindow() {

  windows.main = new electron.BrowserWindow({
    width: 1024,
    height: 768,
    titleBarStyle: 'hidden'
  })

  const menu = getMenu()

  electron.Menu.setApplicationMenu(menu)

  windows.main.loadFile('index.html')

  receiver.setup(windows.main.webContents)

  windows.main.on('closed', () => {
    win = null
  })

}

function getMenu() {

  const template = [{
    label: 'Maha',
    submenu: [{
      label: 'About Maha',
      role: 'about'
    }, {
      label: `Version ${electron.app.getVersion()}`
    }, {
      label: 'Check for Updates',
      click: () => {
        autoUpdater.checkForUpdates()
      }
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: () => {
        electron.app.quit()
      }
    }]
  }, {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectall' }
    ]
  },{
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }]

  return electron.Menu.buildFromTemplate(template)

}

function pushRoute(target) {

  const url = URL.parse(target)

  setTimeout(() => sendMessage('pushRoute', {
    pathname: url.pathname,
    search: url.query,
    hash: url.hash ? url.hash.slice(1) : null
  }), 1000)

}

function receiveMessage(event, message) {

  if(message.target !== 'main') return

  if(message.action === 'updateBadge') {
    electron.app.setBadgeCount(message.data.count)
  }

  if(message.action === 'getVersion') {
    sendMessage('setVersion', {
      version: electron.app.getVersion()
    })
  }

  if(message.action === 'checkForUpdates') {
    autoUpdater.checkForUpdates()
  }

  if(message.action === 'installUpdate') {
    autoUpdater.quitAndInstall()
  }

}

function sendMessage(action, data) {

  windows.main.webContents.send('message', {
    action,
    target: 'renderer',
    data
  })

}
