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
    quantities: PropTypes.object,
    required: PropTypes.bool,
    status: PropTypes.string,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onFinalize: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onValidate: PropTypes.func
  }

  render() {
    const { products, subtotal, tax, total } = this.props
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

  componentDidMount() {
    const { onReady } = this.props
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { quantities, status } = this.props
    if(!_.isEqual(quantities, prevProps.quantities)) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
      if(status === 'finalizing') this._handleFinalize()
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
    this.props.onChange(this.props.value)
  }

  _handleFinalize() {
    this.props.onFinalize(this.props.value)
  }

  _handleUpdate(code, e) {
    const raw = e.target.value
    const value = raw.length > 0 ? parseInt(raw) : 0
    this.props.onSet(code, value)
  }

  _handleValidate() {
    const { required, subtotal } = this.props
    if(required && subtotal === 0) {
      this.props.onValidate('invalid', 'You must specify at least one item')
    } else {
      this.props.onValidate('valid')
    }
  }

}

export default ProductField