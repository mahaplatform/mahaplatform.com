import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Summary extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    onChoose: PropTypes.func
  }

  render() {
    const { products, subtotal, tax, total } = this.props
    return (
      <div className="maha-payment-summary">
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
                <td>{ numeral(product.quantity).format('0.00') }</td>
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

  _handleChoose(selected) {
    this.props.onChoose(selected)
  }

}

export default Summary
