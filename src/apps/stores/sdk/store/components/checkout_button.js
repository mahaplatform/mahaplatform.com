class CheckoutButton {

  body = null
  canvas = null
  cart = null
  config = null
  element = null
  modal = null

  _handleClick = this._handleClick.bind(this)
  _handleInit = this._handleInit.bind(this)

  constructor(element, cart, config) {
    this.element = element
    this.cart = cart
    this.config = config
    this._handleInit()
  }

  _handleClick() {
    this.body.className = 'maha-store open'
    this.iframe = document.createElement('iframe')
    this.iframe.src = `${process.env.WEB_HOST}/stores/stores/abc/checkout`
    this.iframe.frameBorder = 0
    this.modal.appendChild(this.iframe)
  }

  _handleInit() {
    this.element.addEventListener('click', this._handleClick)

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
    this.body.appendChild(this.canvas)

    this.modal = document.createElement('div')
    this.modal.className = 'maha-store-modal'
    this.body.appendChild(this.modal)
  }

}

export default CheckoutButton
