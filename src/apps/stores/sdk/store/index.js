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

  constructor(config) {
    super()
    this.config = config
    this.checkout = new Checkout({
      code: config.code
    })
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
    this._handleFetch()
  }

  _getCreator(type) {
    if(type === 'checkoutButton') return CheckoutButton
    if(type === 'cartButton') return CartButton
    if(type === 'addButton') return AddButton
  }

  _handleFetch() {
    this.cart = new Cart({
      code: this.config.code,
      checkout: this.checkout
    })
    this.emit('ready')
  }

  _handleInit() {
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.type = 'text/css'
    stylesheet.href = `${process.env.WEB_HOST}/css/store.css`
    document.head.appendChild(stylesheet)
  }

}

export default Store
