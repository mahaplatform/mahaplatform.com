import { Button } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import New from './new'
import _ from 'lodash'

class LineItems extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    line_items: PropTypes.array,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    value: PropTypes.object,
    onAddLineItem: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemoveLineItem: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleAddLineItem = this._handleAddLineItem.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleRemoveLineItem = this._handleRemoveLineItem.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { line_items, subtotal, tax, total } = this.props
    return (
      <div className="finance-line-items">
        <table className="ui unstackable celled table">
          <thead>
            <tr className="finance-line-items-header">
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { line_items.map((line_item, index) => (
              <tr className="finance-line-items-row" key={`line_item_${index}`}>
                <td>{ line_item.description }</td>
                <td>{ line_item.quantity }</td>
                <td>{ numeral(line_item.price).format('0.00') }</td>
                <td>{ numeral(line_item.total).format('0.00') }</td>
                <td onClick={ this._handleRemoveLineItem.bind(this, index)}>
                  <i className="fa fa-times" />
                </td>
              </tr>
            )) }
            { line_items.length === 0 &&
              <tr className="finance-line-items-empty">
                <td colSpan="5">There are no line items on this invoice</td>
              </tr>
            }
            { (tax > 0) &&
              <tr className="finance-line-items-total">
                <td colSpan="3">Subtotal</td>
                <td>{ numeral(subtotal).format('0.00') }</td>
                <td />
              </tr>
            }
            { tax > 0 &&
              <tr className="finance-line-items-addon">
                <td colSpan="3">Tax</td>
                <td>{ numeral(tax).format('0.00') }</td>
                <td />
              </tr>
            }
            <tr className="finance-line-items-total">
              <td colSpan="3">Total</td>
              <td>{ numeral(total).format('0.00') }</td>
              <td />
            </tr>
          </tbody>
        </table>
        <div className="finance-line-items-actions">
          <Button { ...this._getNewButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { onSet, defaultValue } = this.props
    if(defaultValue) onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if(!_.isEqual(value, prevProps.value)) {
      this.props.onChange(value)
    }
  }

  _getNew() {
    return {
      onDone: this._handleAddLineItem
    }
  }

  _getNewButton() {
    return {
      label: 'Add Line Item',
      className: 'link',
      handler: this._handleNew
    }
  }

  _handleAddLineItem(line_item) {
    this.props.onAddLineItem(line_item)
  }

  _handleNew() {
    this.context.form.push(New, this._getNew.bind(this))
  }

  _handleRemoveLineItem(index, e) {
    e.stopPropagation()
    this.props.onRemoveLineItem(index)
  }

  _handleUpdate(allocation, index) {
    this.props.onUpdate(allocation, index)
  }

}

export default LineItems
