import Pasteur from 'pasteur'

class Form {

  iframe = null
  pasteur = null
  code = null
  style = null

  _handleInit = this._handleInit.bind(this)
  _handleReady = this._handleReady.bind(this)
  _handleResize = this._handleResize.bind(this)

  constructor(config) {
    this.code = config.code
    this.style = config.style
    document.addEventListener('DOMContentLoaded', this._handleInit, false)
  }

  _handleInit() {
    this.div = document.querySelectorAll(`[data-form="${this.code}"]`)[0]
    this.iframe = document.createElement('iframe')
    this.iframe.src = `${process.env.WEB_HOST}/crm/forms/${this.code}?embedded`
    this.iframe.frameBorder = 0
    this.iframe.style.width = '100%'
    this.div.appendChild(this.iframe)
    this.pasteur = new Pasteur({
      window,
      target: this.iframe.contentWindow,
      name: 'embed',
      targetName: 'form'
    })
    this.pasteur.on('ready', this._handleReady)
    this.pasteur.on('resize', this._handleResize)
  }

  _handleReady() {
    if(this.style) this.pasteur.send('style', this.style)
  }

  _handleResize(height) {
    this.iframe.style.height = `${height}px`
  }

}

export default Form
