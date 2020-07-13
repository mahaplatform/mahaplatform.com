import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class ProductField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    line_items: PropTypes.array,
    quantities: PropTypes.object,
    required: PropTypes.bool,
    status: PropTypes.string,
    subtotal: PropTypes.number,
    tabIndex: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleFocus = this._handleFocus.bind(this)

  render() {
    const { line_items, subtotal, tax, total } = this.props
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
            { line_items.length === 0 &&
              <tr>
                <td colSpan="4">There are no products</td>
              </tr>
            }
            { line_items.map((line_item, index) => (
              <tr key={`product_${index}`}>
                <td>{ line_item.description }</td>
                <td className="input">
                  <input { ...this._getInput(line_item) } />
                </td>
                <td>{ numeral(line_item.price).format('0.00') }</td>
                <td>{ numeral(line_item.total).format('0.00') }</td>
              </tr>
            )) }
            { tax > 0 &&
              <tr className="total">
                <td colSpan="3">Subtotal</td>
                <td>{ numeral(subtotal).format('0.00') }</td>
              </tr>
            }
            { tax > 0 &&
              <tr>
                <td colSpan="3">Tax</td>
                <td>{ numeral(tax).format('0.00') }</td>
              </tr>
            }
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
    }
  }

  _getInput(line_item) {
    const { tabIndex } = this.props
    return {
      tabIndex,
      type: 'text',
      value: line_item.quantity,
      onFocus: this._handleFocus,
      onChange: this._handleUpdate.bind(this, line_item.code)
    }
  }

  _handleFocus(e) {
    e.target.select()
  }

  _handleChange() {
    this.props.onChange(this.props.value)
  }

  _handleUpdate(code, e) {
    const raw = e.target.value
    const value = raw.length > 0 ? parseInt(raw) : 0
    this.props.onSet(code, value)
  }

  _handleValidate() {
    const { required, subtotal, value } = this.props
    if(required && subtotal === 0) {
      this.props.onValidate(null, 'You must specify at least one item')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default ProductField
