import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class ProductField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    products: PropTypes.array,
    onChange: PropTypes.func
  }

  state = {
    quantities: {}
  }

  input = null

  render() {
    const { quantities } = this.state
    const products = this.props.products.map(product => {
      const quantity = quantities[product.code] || 0
      return {
        ...product,
        quantity,
        total: quantity * product.price
      }
    })
    const subtotal = products.reduce((subtotal, product) => {
      return subtotal + product.total
    }, 0.00)
    const tax = products.reduce((tax, product) => {
      return tax + (product.total * product.tax)
    }, 0.00)
    const total = subtotal + tax
    return (
      <div className="maha-productfield">
        <table className="ui unstackable celled table">
          <thead>
            <tr>
              <th>Item</th>
              <th className="collapsing">Qty</th>
              <th className="collapsing">Price</th>
              <th className="collapsing">Total</th>
            </tr>
          </thead>
          <tbody>
            { products.map((product, index) => (
              <tr key={`product_${index}`}>
                <td>{ product.name }</td>
                <td className="input">
                  <input { ...this._getInput(product) } />
                </td>
                <td>{ numeral(product.price).format('0.00') }</td>
                <td>{ numeral(product.total).format('0.00') }</td>
              </tr>
            )) }
            <tr className="total">
              <td colSpan="3">Subtotal</td>
              <td>{ numeral(subtotal).format('0.00') }</td>
            </tr>
            <tr>
              <td colSpan="3">Tax</td>
              <td>{ numeral(tax).format('0.00') }</td>
            </tr>
            <tr className="total">
              <td colSpan="3">Total</td>
              <td>{ numeral(total).format('0.00') }</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { quantities } = this.state
    if(!_.isEqual(quantities, prevState.quantities)) {
      this._handleChange()
    }
  }

  _getInput(product) {
    return {
      type: 'text',
      value: product.quantity,
      onChange: this._handleUpdate.bind(this, product.code)
    }
  }

  _handleChange() {
    this.props.onChange(this.state.quantities)
  }

  _handleUpdate(code, e) {
    const { quantities } = this.state
    this.setState({
      quantities: {
        ...quantities,
        [code]: e.target.value.length > 0 ? parseInt(e.target.value) : 0
      }
    })
  }

}

export default ProductField
