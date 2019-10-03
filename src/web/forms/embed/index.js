import Pasteur from 'pasteur'

class Embed {

  iframe = null
  pasteur = null

  _handleInit = this._handleInit.bind(this)
  _handleResize = this._handleResize.bind(this)

  constructor() {
    document.addEventListener('DOMContentLoaded', this._handleInit, false)
  }

  _handleInit() {
    this.iframe = document.createElement('iframe')
    this.iframe.src = 'http://localhost:8080/crm/forms/1234'
    this.iframe.frameBorder = 0
    this.iframe.style.width = '100%'
    document.body.appendChild(this.iframe)
    this.pasteur = new Pasteur({
      window,
      target: this.iframe.contentWindow,
      name: 'embed',
      targetName: 'form',
      services: {
        embed: {
          resize: this._handleResize
        }
      }
    })
  }

  _handleResize(height) {
    console.log(height)
    this.iframe.style.height = `${height}px`
  }

}

new Embed()
