import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Coupon from './coupon'
import numeral from 'numeral'
import React from 'react'
import New from './new'
import _ from 'lodash'

class LineItems extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    coupon: PropTypes.object,
    coupon_id: PropTypes.number,
    coupons: PropTypes.object,
    discount: PropTypes.number,
    line_items: PropTypes.array,
    products: PropTypes.object,
    status: PropTypes.string,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    value: PropTypes.array,
    onAddCoupon: PropTypes.func,
    onAddLineItem: PropTypes.func,
    onChange: PropTypes.func,
    onFetchCoupons: PropTypes.func,
    onFetchProducts: PropTypes.func,
    onReady: PropTypes.func,
    onRemoveCoupon: PropTypes.func,
    onRemoveLineItem: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleAddCoupon = this._handleAddCoupon.bind(this)
  _handleAddLineItem = this._handleAddLineItem.bind(this)
  _handleCoupon = this._handleCoupon.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleRemoveCoupon = this._handleRemoveCoupon.bind(this)
  _handleRemoveLineItem = this._handleRemoveLineItem.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { coupon, discount, line_items, status, subtotal, tax, total } = this.props
    if(status !== 'success') return null
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
            { (tax > 0 || discount > 0) &&
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
            { discount > 0 &&
              <tr className="finance-line-items-addon">
                <td colSpan="3">Discount (Coupon { coupon.code })</td>
                <td>-{ numeral(discount).format('0.00') }</td>
                <td onClick={ this._handleRemoveCoupon }>
                  <i className="fa fa-times" />
                </td>
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
          { line_items.length > 0 && coupon === null &&
            <span> | <Button { ...this._getCouponButton() } /></span>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetchCoupons()
    this.props.onFetchProducts()
  }

  componentDidUpdate(prevProps) {
    const { line_items, status, value, onReady } = this.props
    if(status !== prevProps.status) {
      if(status === 'success') return onReady()
    }
    if(!_.isEqual(line_items, prevProps.line_items)) {
      this.props.onChange(value)
    }
  }

  _getCoupon() {
    return {
      onChoose: this._handleAddCoupon
    }
  }

  _getCouponButton() {
    return {
      label: 'Add Coupon',
      className: 'link',
      handler: this._handleCoupon
    }
  }

  _getNew() {
    const { products } = this.props
    return {
      products: products.records,
      onSubmit: this._handleAddLineItem
    }
  }

  _getNewButton() {
    return {
      label: 'Add Line Item',
      className: 'link',
      handler: this._handleNew
    }
  }

  _handleAddCoupon(coupon) {
    this.props.onAddCoupon(coupon)
  }

  _handleAddLineItem(line_item) {
    this.props.onAddLineItem(line_item)
  }

  _handleCoupon() {
    this.context.form.push(Coupon, this._getCoupon.bind(this))
  }

  _handleNew() {
    this.context.form.push(New, this._getNew.bind(this))
  }

  _handleRemoveCoupon(e) {
    e.stopPropagation()
    this.props.onRemoveCoupon()
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
