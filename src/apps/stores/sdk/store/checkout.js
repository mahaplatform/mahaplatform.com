import Emitter from './emitter'
import Pasteur from 'pasteur'

class Checkout extends Emitter {

  checkout = null
  code = null
  overlay = null

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
      this.overlay.classList.add('open')
      this.checkout.classList.add('open')
      this.overlay.classList.add('open-active')
      this.checkout.classList.add('open-active')
    }, 250)
  }

  _handleInit() {
    this.overlay = document.createElement('div')
    this.overlay.className = 'maha-store-overlay'
    this.overlay.addEventListener('click', this._handleClose)
    document.body.appendChild(this.overlay)
    this.checkout = document.createElement('div')
    this.checkout.className = 'maha-store-checkout'
    document.body.appendChild(this.checkout)
    this.iframe = document.createElement('iframe')
    this.iframe.frameBorder = 0
    this.checkout.appendChild(this.iframe)
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
    this.overlay.classList.remove('open-active')
    this.checkout.classList.remove('open-active')
    setTimeout(() => {
      this.overlay.classList.remove('open')
      this.checkout.classList.remove('open')
      this.iframe.src = 'about:blank'
    }, 250)
  }

  _handleComplete() {
    this.emit('complete')
  }

}

export default Checkout
