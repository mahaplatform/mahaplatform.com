import Emitter from './emitter'
import Pasteur from 'pasteur'

class Cart extends Emitter {

  code = null
  checkout = null
  db = null
  overlay = null
  pasteur = null
  iframe = null
  items = []
  open = false

  _handleChange = this._handleChange.bind(this)
  _handleCheckout = this._handleCheckout.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleError = this._handleError.bind(this)
  _handleFetchItems = this._handleFetchItems.bind(this)

  constructor(config) {
    super()
    this.code = config.code
    this.checkout = config.checkout
    this._handleInit()
  }

  addItem(code, quantity = 1) {
    this.pasteur.send('add', { code, quantity}, this._handleChange, this._handleError)
    this.show()
  }

  clearItems() {
    this.pasteur.send('clear', this._handleChange, this._handleError)
  }

  discard() {
    this.pasteur.send('discard')
  }

  getCount() {
    return this.items.reduce((count, item) => {
      return count + item.quantity
    }, 0)
  }

  hide() {
    this.open = false
    this.overlay.classList.remove('open-active')
    this.cart.classList.remove('open-active')
    setTimeout(() => {
      this.overlay.classList.remove('open')
      this.cart.classList.remove('open')
    }, 250)
  }

  removeItem(code) {
    this.pasteur.send('remove', code)
  }


  show() {
    this.open = true
    this.overlay.classList.add('open')
    this.cart.classList.add('open')
    this.overlay.classList.add('open-active')
    this.cart.classList.add('open-active')
  }

  toggle() {
    if(this.open) return this.hide()
    this.show()
  }

  updateItem(code, increment) {
    this.pasteur.send('remove', { code, increment }, this._handleChange, this._handleError)
  }

  _handleChange(cart) {
    this.items = cart.items
    this.emit('change')
  }

  _handleCheckout() {
    this.checkout.begin()
  }

  _handleClose() {
    this.hide()
  }

  _handleFetchItems() {
    this.pasteur.send('get', null, (cart) => {
      this._handleSetItems(cart ? cart.items : [])
    })
  }

  _handleError(error) {
    console.log(error)
  }

  _handleInit() {
    this.overlay = document.createElement('div')
    this.overlay.className = 'maha-store-overlay'
    this.overlay.onclick = this._handleClose
    document.body.appendChild(this.overlay)
    this.cart = document.createElement('div')
    this.cart.className = 'maha-store-cart'
    document.body.appendChild(this.cart)
    this.iframe = document.createElement('iframe')
    this.iframe.src = `${process.env.WEB_HOST}/stores/stores/${this.code}/cart`
    this.iframe.frameBorder = 0
    this.cart.appendChild(this.iframe)
    this.pasteur = new Pasteur({
      window,
      target: this.iframe.contentWindow,
      name: 'store',
      targetName: 'cart'
    })
    this.pasteur.on('ready', this._handleFetchItems)
    this.pasteur.on('checkout', this._handleCheckout)
    this.pasteur.on('change', this._handleChange)
    this.pasteur.on('close', this._handleClose)
  }

  _handleSetItems(items) {
    this.pasteur.send('set', {
      items
    }, this._handleChange)
  }

}

export default Cart
