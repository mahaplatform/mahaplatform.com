import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class CartDisplay extends React.Component {

  static propTypes = {
    cart: PropTypes.object
  }

  state = {
    variants: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { variants } = this.state
    const subtotal = this._getSubTotal()
    const tax = this._getTax()
    const total = this._getTotal()
    return (
      <div className="maha-store-cart">
        <table>
          <thead>
            <tr>
              <th />
              <th />
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            { variants.map((variant, index) => (
              <tr key={`product_${index}`}>
                <td>
                  <div onClick={ this._handleRemove.bind(this, variant.code) }>x</div>
                </td>
                <td>
                  <img src={ variant.image } width="37" />
                </td>
                <td>
                  <strong>{ variant.title }</strong>
                  { variant.options.length > 0 &&
                    <div>
                      { variant.options.map(option => {
                        return `${option.option}: ${option.value}`
                      }).join(', ')}
                    </div>
                  }
                </td>
                <td>{ numeral(variant.price).format('0.00') }</td>
                <td>
                  <div onClick={ this._handleUpdate.bind(this, variant.code, -1) }>-</div>
                  { variant.quantity }
                  <div onClick={ this._handleUpdate.bind(this, variant.code, 1) }>+</div>
                </td>
                <td>{ numeral(variant.quantity * variant.price).format('0.00') }</td>
              </tr>
            )) }
            { variants.length === 0 &&
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
        <div onClick={ this._handleClear }>empty cart</div>
      </div>
    )
  }

  componentDidMount() {
    const { cart } = this.props
    cart.on('change', this._handleChange)
    this.setState({
      variants: cart.getItems()
    })
  }

  _getSubTotal() {
    return this.state.variants.reduce((subtotal, variant) => {
      return subtotal + (Number(variant.quantity) * Number(variant.price))
    }, 0.00)
  }

  _getTax() {
    return this.state.variants.reduce((tax, variant) => {
      return tax + (Number(variant.quantity) * Number(variant.price) * Number(variant.tax_rate))
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
      variants: cart.getItems()
    })
  }

  _handleClear() {
    this.props.cart.clearItems()
  }

  _handleRemove(code) {
    this.props.cart.removeItem(code)
  }

  _handleUpdate(code, increment) {
    this.props.cart.updateItem(code, increment)
  }

}

export default CartDisplay
