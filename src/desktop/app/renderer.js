import { ipcRenderer } from 'electron'
import Pasteur from 'pasteur'
import './index.less'

class App {

  body = null
  iframe = null
  pasteur = null

  _handleOpenWindow = this._handleOpenWindow.bind(this)

  constructor() {
    this.render()
    this.pasteur = new Pasteur({
      debug: true,
      window,
      target: this.iframe.contentWindow,
      name: 'host',
      targetName: 'app',
      services: {
        host: {
          openWindow: this._handleOpenWindow
        }
      }
    })
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

}

const app = new App()
