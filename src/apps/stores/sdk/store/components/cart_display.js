import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class CartDisplay extends React.Component {

  static propTypes = {
    cart: PropTypes.object
  }

  state = {
    products: []
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    const { products } = this.state
    const subtotal = this._getSubTotal()
    const tax = this._getTax()
    const total = this._getTotal()
    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { products.map((product, index) => (
            <tr key={`product_${index}`}>
              <td>
                <div onClick={ this._handleRemove.bind(this, product.code) }>x</div>
              </td>
              <td>
                <img src={ product.image } width="50" />
                { product.title }
              </td>
              <td>{ numeral(product.price).format('0.00') }</td>
              <td>
                <div onClick={ this._handleUpdate.bind(this, product.code, -1) }>-</div>
                { product.quantity }
                <div onClick={ this._handleUpdate.bind(this, product.code, 1) }>+</div>
              </td>
              <td>{ numeral(product.quantity * product.price).format('0.00') }</td>
            </tr>
          )) }
          { products.length === 0 &&
            <tr>
              <td colSpan="5">The cart is empty</td>
            </tr>
          }
        </tbody>
        <tfoot>
          { tax > 0 &&
            <tr>
              <td colSpan="4">Subtotal</td>
              <td>{ numeral(subtotal).format('0.00') }</td>
            </tr>
          }
          { tax > 0 &&
            <tr>
              <td colSpan="4">Tax</td>
              <td>{ numeral(tax).format('0.00') }</td>
            </tr>
          }
          <tr>
            <td colSpan="4">Total</td>
            <td>{ numeral(total).format('0.00') }</td>
          </tr>
        </tfoot>
      </table>
    )
  }

  componentDidMount() {
    const { cart } = this.props
    cart.on('change', this._handleChange)
    this.setState({
      products: cart.getProducts()
    })
  }

  _getSubTotal() {
    return this.state.products.reduce((subtotal, product) => {
      return subtotal + (Number(product.quantity) * Number(product.price))
    }, 0.00)
  }

  _getTax() {
    return this.state.products.reduce((tax, product) => {
      return tax + (Number(product.quantity) * Number(product.price) * Number(product.tax_rate))
    }, 0.00)
  }

  _getTotal() {
    const subtotal = this._getSubTotal()
    const tax = this._getTax()
    return subtotal + tax
  }

  _handleChange() {
    const { cart } = this.props
    this.setState({
      products: cart.getProducts()
    })

  }

  _handleRemove(code) {
    this.props.cart.removeProduct(code)
  }

  _handleUpdate(code, increment) {
    this.props.cart.updateProduct(code, increment)
  }

}

export default CartDisplay
