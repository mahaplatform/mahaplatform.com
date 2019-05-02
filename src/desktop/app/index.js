var electron = require('electron')
var receiver = require ('electron-push-receiver/src/constants')
var localforage = require('localforage')

var host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mahaplatform.com'
var iframe, header, body, token, iframe = null

var store = localforage.createInstance({
  name: 'local',
  storeName: 'electron'
})

electron.ipcRenderer.on(receiver.NOTIFICATION_SERVICE_STARTED, (_, pushToken) => token = pushToken)

electron.ipcRenderer.on(receiver.TOKEN_UPDATED, (_, pushToken) => token = pushToken)

electron.ipcRenderer.on(receiver.NOTIFICATION_SERVICE_ERROR, (_, pushToken) => {
  console.log('notification error', error)
})

electron.ipcRenderer.on(receiver.NOTIFICATION_RECEIVED, (_, payload) => {
  sendMessage('pushNotification', payload.data)
})

electron.ipcRenderer.send(receiver.START_NOTIFICATION_SERVICE, '457997349543')

iframe = document.createElement('iframe')
iframe.setAttribute('src', host + '/admin')
iframe.setAttribute('border', 0)

header = document.getElementById('header')
if(window.navigator.userAgent.match(/Windows/)) {
  header.classList.add("hidden")
}

body = document.getElementById('body')
body.appendChild(iframe)

function sendMessage(action, data) {
  iframe.contentWindow.postMessage({
    action,
    target: 'renderer',
    data
  }, '*')
}

function receiveMessage(e) {
  if(e.data.action === 'loadPermission') return loadPermission()
  if(e.data.action === 'requestPermission') return requestPermission()
  if(e.data.action === 'getToken') return getToken()
  if(e.data.target !== 'main') return
  electron.ipcRenderer.send('message', e.data)
}

function loadPermission() {
  store.getItem('permission', function (err, value) {
    const permission = value || 'default'
    sendMessage('loadPermission', { permission })
  })
}

function requestPermission() {
  store.setItem('permission', 'granted', function (err, permission) {
    sendMessage('requestPermission', { permission })
  })
}

function getToken() {
  sendMessage('getToken', { token })
}

window.addEventListener('message', receiveMessage, false)

electron.ipcRenderer.on('message', (event, message) => {
  if(message.target !== 'renderer') return
  iframe.contentWindow.postMessage(message, '*')
})
