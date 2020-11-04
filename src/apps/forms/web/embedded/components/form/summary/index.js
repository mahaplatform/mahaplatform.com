import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Summary extends React.Component {

  static propTypes = {
    line_items: PropTypes.array,
    subtotal: PropTypes.string,
    tax: PropTypes.string,
    total: PropTypes.string,
    onChoose: PropTypes.func
  }

  render() {
    const { line_items, subtotal, tax, total } = this.props
    return (
      <div className="maha-payment-summary">
        <div className="maha-payment-label">Payment Summary</div>
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
            { line_items.map((line_item, index) => (
              <tr key={`line_item_${index}`}>
                <td>{ line_item.description }</td>
                <td>{ line_item.quantity }</td>
                <td>{ numeral(line_item.price).format('0.00') }</td>
                <td>{ numeral(line_item.total).format('0.00') }</td>
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
