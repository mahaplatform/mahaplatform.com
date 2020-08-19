import Emitter from './emitter'
import Pasteur from 'pasteur'

class Checkout extends Emitter {

  checkout = null
  code = null

  _handleClose = this._handleClose.bind(this)
  _handleComplete = this._handleComplete.bind(this)

  constructor(config) {
    super()
    this.code = config.code
    this._handleInit()
  }

  begin() {
    this.emit('begin')
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
    this.pasteur.on('complete', this._handleComplete)
    this.pasteur.on('close', this._handleClose)
  }

  _handleClose() {
    this.checkout.className = 'maha-store'
    setTimeout(() => {
      this.iframe.src = 'about:blank'
    }, 250)
  }

  _handleComplete() {
    this.emit('complete')
  }

}

export default Checkout
