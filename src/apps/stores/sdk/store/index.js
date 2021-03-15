import CheckoutButton from './components/checkout_button'
import CartButton from './components/cart_button'
import AddButton from './components/add_button'
import Emitter from './emitter'
import Checkout from './checkout'
import Cart from './cart'

class Store extends Emitter {

  catalog = null
  cart = null
  checkout = null
  config = null
  components = []

  _handleClose = this._handleClose.bind(this)
  _handleComplete = this._handleComplete.bind(this)

  constructor(config) {
    super()
    this.config = config
    this.checkout = new Checkout({
      code: config.code
    })
    this.cart = new Cart({
      code: this.config.code,
      checkout: this.checkout
    })
    this.checkout.on('begin', this._handleClose)
    this.checkout.on('close', this._handleClose)
    this.checkout.on('complete', this._handleComplete)
    this._handleInit()
  }

  createComponent(type, config) {
    const Component = this._getCreator(type)
    const element = document.querySelectorAll(`[data-id="${config.code}"]`)[0]
    const component = new Component(element, this.cart, this.checkout, config)
    this.components.push(component)
  }

  getCart() {
    return this.cart
  }

  init() {
    this.emit('ready')
  }

  _getCreator(type) {
    if(type === 'checkoutButton') return CheckoutButton
    if(type === 'cartButton') return CartButton
    if(type === 'addButton') return AddButton
  }

  _handleClose() {
    this.cart.hide()
  }

  _handleComplete() {
    this.cart.discard()
  }

  _handleInit() {
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.type = 'text/css'
    stylesheet.href = `${process.env.ADMIN_HOST}/maha.css`
    document.head.appendChild(stylesheet)
  }

}

export default Store
