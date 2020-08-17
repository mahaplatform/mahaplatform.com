import Emitter from './emitter'
import Pasteur from 'pasteur'

class Cart extends Emitter {

  catalog = null
  code = null
  checkout = null
  db = null
  pasteur = null
  iframe = null
  items = []
  open = false

  _handleCheckout = this._handleCheckout.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleFetchItems = this._handleFetchItems.bind(this)

  constructor(config) {
    super()
    this.catalog = config.catalog
    this.code = config.code
    this.checkout = config.checkout
    this._handleInit()
  }

  addItem(code) {
    this.pasteur.send('add', code)
  }

  clearItems() {
    this.pasteur.send('clear')
  }

  getCount() {
    return this.items.reduce((count, item) => {
      return count + item.quantity
    }, 0)
  }

  getItems() {
    const variants = this.catalog.getVariants()
    return this.items.map(item => ({
      ...item,
      ...variants.find(variant => {
        return variant.code === item.code
      })
    }))
  }

  hide() {
    this.open = false
    this.cart.className = 'maha-store-cart'
  }

  removeItem(code) {
    this.pasteur.send('remove', code)
  }

  show() {
    this.open = true
    this.cart.className = 'maha-store-cart open'
  }

  toggle() {
    if(this.open) return this.hide()
    this.show()
  }

  updateItem(code, increment) {
    this.pasteur.send('remove', { code, increment })
  }

  _handleInit() {
    this.iframe = document.createElement('iframe')
    this.iframe.src = `${process.env.WEB_HOST}/stores/stores/${this.code}/cart`
    this.iframe.frameBorder = 0
    this.cart = document.createElement('div')
    this.cart.className = 'maha-store-cart'
    this.cart.appendChild(this.iframe)
    document.body.appendChild(this.cart)
    this.pasteur = new Pasteur({
      window,
      target: this.iframe.contentWindow,
      name: 'cart',
      targetName: 'cartStore'
    })
    this.pasteur.on('ready', this._handleFetchItems)
    this.pasteur.on('checkout', this._handleCheckout)
    this.pasteur.on('close', this._handleClose)
  }

  _handleCheckout() {
    this.hide()
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

  _handleSetItems(items) {
    this.pasteur.send('set', {
      items
    }, (cart) => {
      this.items = cart.items
      this.emit('change')
    })
  }

}

export default Cart
