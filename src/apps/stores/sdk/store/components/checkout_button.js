class CheckoutButton {

  body = null
  canvas = null
  cart = null
  checkout = null
  config = null
  element = null
  modal = null

  _handleClick = this._handleClick.bind(this)

  constructor(element, cart, checkout, config) {
    this.element = element
    this.checkout = checkout
    this.cart = cart
    this.config = config
    this.element.addEventListener('click', this._handleClick)
  }

  _handleClick() {
    this.checkout.begin()
  }

}

export default CheckoutButton
