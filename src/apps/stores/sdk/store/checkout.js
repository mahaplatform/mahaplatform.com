class Checkout {

  code = null

  _handleClose = this._handleClose.bind(this)

  constructor(config) {
    this.code = config.code
    this._handleInit()
  }

  begin() {
    this.body.className = 'maha-store open'
    this.iframe = document.createElement('iframe')
    this.iframe.src = `${process.env.WEB_HOST}/stores/stores/${this.code}/checkout`
    this.iframe.frameBorder = 0
    this.modal.appendChild(this.iframe)
  }

  _handleInit() {
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.type = 'text/css'
    stylesheet.href = `${process.env.WEB_HOST}/css/store.css`
    document.head.appendChild(stylesheet)

    this.body = document.createElement('div')
    this.body.className = 'maha-store'
    document.body.appendChild(this.body)

    this.canvas = document.createElement('div')
    this.canvas.className = 'maha-store-canvas'
    this.canvas.addEventListener('click', this._handleClose)
    this.body.appendChild(this.canvas)

    this.modal = document.createElement('div')
    this.modal.className = 'maha-store-modal'
    this.body.appendChild(this.modal)
  }

  _handleClose() {
    this.body.className = 'maha-store'
    this.modal.removeChild(this.iframe)
  }

}

export default Checkout
