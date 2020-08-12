class AddButton {

  cart = null
  config = null
  element = null

  _handleClick = this._handleClick.bind(this)

  constructor(element, cart, config) {
    this.element = element
    this.cart = cart
    this.config = config
    element.addEventListener('click', this._handleClick)
  }

  _handleClick() {
    this.cart.addProduct(this.config.code)
  }

}

export default AddButton
