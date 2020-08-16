class CartButton {

  cart = null
  config = null
  element = null

  _handleChange = this._handleChange.bind(this)
  _handleClick = this._handleClick.bind(this)

  constructor(element, cart, checkout, config) {
    this.element = element
    this.cart = cart
    this.config = config
    this.cart.on('change', this._handleChange)
    element.addEventListener('click', this._handleClick)
  }

  _handleChange() {
    const count = this.cart.getCount()
    this.element.innerHTML = `Cart (${count})`
  }

  _handleClick() {
    this.cart.toggle()
  }

}

export default CartButton
