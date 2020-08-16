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
    this.iframe.style.transform = 'translateX(100%)'
  }

  removeItem(code) {
    this.pasteur.send('remove', code)
  }

  show() {
    this.open = true
    this.iframe.style.transform = 'translateX(0)'
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
    this.iframe.style.position = 'absolute'
    this.iframe.style.top = 0
    this.iframe.style.right = 0
    this.iframe.style.bottom = 0
    this.iframe.style.width = '500px'
    this.iframe.style.height = '100%'
    this.iframe.style.backgroundColor = '#EEEEEE'
    this.iframe.style.transition = 'transform .15s ease-in-out 0s'
    this.iframe.style.transform = 'translateX(100%)'
    this.iframe.style.boxShadow = '-5px 0 5px rgba(0,0,0,0.05)'
    document.body.appendChild(this.iframe)
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
    console.log(this.checkout)
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
