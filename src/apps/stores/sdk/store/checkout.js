import Pasteur from 'pasteur'

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

    this.iframe = document.createElement('iframe')
    this.iframe.frameBorder = 0
    modal.appendChild(this.iframe)

    this.pasteur = new Pasteur({
      window,
      target: this.iframe.contentWindow,
      name: 'store',
      targetName: 'cart'
    })
    this.pasteur.on('close', this._handleClose)
  }

  _handleClose() {
    this.checkout.className = 'maha-store'
    setTimeout(() => {
      this.iframe.src = 'about:blank'
    }, 250)

  }

}

export default Checkout
