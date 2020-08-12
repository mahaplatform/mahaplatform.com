import CartDisplay from './cart_display'
import ReactDOM from 'react-dom'
import React from 'react'

class CartButton {

  cart = null
  config = null
  element = null

  _handleChange = this._handleChange.bind(this)
  _handleClick = this._handleClick.bind(this)

  constructor(element, cart, config) {
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
    const body = document.getElementsByTagName('body')[0]
    const node = document.createElement('DIV')
    body.appendChild(node)
    ReactDOM.render(<CartDisplay cart={ this.cart } />, node)
  }

}

export default CartButton
