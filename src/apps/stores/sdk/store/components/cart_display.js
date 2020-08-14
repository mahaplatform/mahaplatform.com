import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class CartDisplay extends React.Component {

  static propTypes = {
    cart: PropTypes.object
  }

  state = {
    items: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { items } = this.state
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
            { items.map((item, index) => (
              <tr key={`product_${index}`}>
                <td>
                  <div onClick={ this._handleRemove.bind(this, item.code) }>x</div>
                </td>
                <td>
                  <img src={ item.image } width="37" />
                </td>
                <td>
                  <strong>{ item.title }</strong>
                  { item.options.length > 0 &&
                    <div>
                      { item.options.map(option => {
                        return `${option.option}: ${option.value}`
                      }).join(', ')}
                    </div>
                  }
                </td>
                <td>{ numeral(item.price).format('0.00') }</td>
                <td>
                  <div onClick={ this._handleUpdate.bind(this, item.code, -1) }>-</div>
                  { item.quantity }
                  <div onClick={ this._handleUpdate.bind(this, item.code, 1) }>+</div>
                </td>
                <td>{ numeral(item.quantity * item.price).format('0.00') }</td>
              </tr>
            )) }
            { items.length === 0 &&
              <tr>
                <td colSpan="6">The cart is empty</td>
              </tr>
            }
          </tbody>
          <tfoot>
            { tax > 0 &&
              <tr>
                <td colSpan="5">Subtotal</td>
                <td>{ numeral(subtotal).format('0.00') }</td>
              </tr>
            }
            { tax > 0 &&
              <tr>
                <td colSpan="5">Tax</td>
                <td>{ numeral(tax).format('0.00') }</td>
              </tr>
            }
            <tr>
              <td colSpan="5">Total</td>
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
      items: cart.getItems()
    })
  }

  _getSubTotal() {
    return this.state.items.reduce((subtotal, item) => {
      return subtotal + (Number(item.quantity) * Number(item.price))
    }, 0.00)
  }

  _getTax() {
    return this.state.items.reduce((tax, item) => {
      return tax + (Number(item.quantity) * Number(item.price) * Number(item.tax_rate))
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
      items: cart.getItems()
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
