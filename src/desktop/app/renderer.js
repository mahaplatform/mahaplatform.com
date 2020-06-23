import { ipcRenderer } from 'electron'
import Pasteur from 'pasteur'
import './index.less'

class App {

  body = null
  iframe = null
  pasteur = null

  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handleSetBadgeCount = this._handleSetBadgeCount.bind(this)
  _handleSetTitle = this._handleSetTitle.bind(this)

  constructor() {
    this.render()
    this.pasteur = new Pasteur({
      debug: true,
      window,
      target: this.iframe.contentWindow,
      name: 'host',
      targetName: 'app'
    })
    this.pasteur.on('openWindow', this._handleOpenWindow)
    this.pasteur.on('pushNotification', this._handlePushNotification)
    this.pasteur.on('setBadgeCount', this._handleSetBadgeCount)
    this.pasteur.on('setTitle', this._handleSetTitle)
  }

  render() {
    const host = process.env.NODE_ENV !== 'production' ? 'https://dev.mahaplatform.com:8080' : 'https://mahaplatform.com'
    this.iframe = document.createElement('iframe')
    this.iframe.setAttribute('src', host + '/admin?log=true')
    this.iframe.setAttribute('border', 0)
    this.body = document.getElementById('body')
    this.body.appendChild(this.iframe)
  }

  _handleOpenWindow(url) {
    ipcRenderer.send('openWindow', url)
  }

  _handlePushNotification(data) {
    const notification = new Notification(data.title, {
      body: data.body,
      silent: true
    })
    if(data.sound) {
      const audio = new Audio(data.sound)
      audio.play()
    }
    notification.onclick = () => {}
  }

  _handleSetBadgeCount(count) {
    ipcRenderer.send('setBadgeCount', count)
  }

  _handleSetTitle(title) {
    document.getElementsByTagName('title')[0].text = title || 'Maha'
  }

}

new App()
