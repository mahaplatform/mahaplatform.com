class Checkout {

  checkout = null
  code = null

  _handleClose = this._handleClose.bind(this)

  constructor(config) {
    this.code = config.code
    this._handleInit()
  }

  begin() {
    this.iframe.src = `${process.env.WEB_HOST}/stores/stores/${this.code}/checkout`
    setTimeout(() => {
      this.checkout.className = 'maha-store-checkout open'
    }, 250)
  }

  _handleInit() {
    this.checkout = document.createElement('div')
    this.checkout.className = 'maha-store-checkout'
    document.body.appendChild(this.checkout)

    const canvas = document.createElement('div')
    canvas.className = 'maha-store-checkout-canvas'
    canvas.addEventListener('click', this._handleClose)
    this.checkout.appendChild(canvas)

    const modal = document.createElement('div')
    modal.className = 'maha-store-checkout-modal'
    this.checkout.appendChild(modal)

    const header = document.createElement('div')
    header.className = 'maha-store-checkout-modal-header'
    modal.appendChild(header)

    const close = document.createElement('div')
    close.className = 'maha-store-checkout-modal-header-icon'
    close.innerHTML = 'X'
    close.addEventListener('click', this._handleClose)
    header.appendChild(close)

    const title = document.createElement('div')
    title.className = 'maha-store-checkout-modal-header-title'
    title.innerHTML = 'Checkout'
    header.appendChild(title)

    const body = document.createElement('div')
    body.className = 'maha-store-checkout-modal-body'
    modal.appendChild(body)

    this.iframe = document.createElement('iframe')
    this.iframe.frameBorder = 0
    body.appendChild(this.iframe)
  }

  _handleClose() {
    this.checkout.className = 'maha-store'
    setTimeout(() => {
      this.iframe.src = 'about:blank'
    }, 250)

  }

}

export default Checkout
