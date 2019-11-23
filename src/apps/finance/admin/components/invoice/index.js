import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

class Invoice extends React.PureComponent {

  static propTypes = {
    invoice: PropTypes.object
  }

  render() {
    const { invoice } = this.props
    return (
      <div className="finance-invoice">
        <div className="finance-invoice-details">
          <div className="finance-invoice-vendor">
            <div className="finance-invoice-vendor-logo">
              <Logo team={ invoice.program } width="110" />
            </div>
            <div className="finance-invoice-vendor-details">
              <strong>{ invoice.program.title }</strong><br />
              615 Willow Ave<br />
              Ithaca, NY 14850
            </div>
          </div>
          <div className="finance-invoice-properties">
            <table>
              <tbody>
                <tr>
                  <td>Customer:</td>
                  <td>{ invoice.contact.display_name }</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{ moment(invoice.date).format('MMM DD, YYYY') }</td>
                </tr>
                <tr>
                  <td>Due:</td>
                  <td>{ moment(invoice.due).format('MMM DD, YYYY') }</td>
                </tr>
                <tr>
                  <td>Invoice ID:</td>
                  <td>{ invoice.code }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="finance-invoice-lineitems">
          <table className="ui table celled compact unstackable">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              { invoice.line_items.map((line_item, index) => (
                <tr key={`line_item_${index}`}>
                  <td>{ line_item.product.title }</td>
                  <td>{ line_item.quantity }</td>
                  <td>{ numeral(line_item.price).format('0.00') }</td>
                  <td>{ numeral(line_item.total).format('0.00') }</td>
                </tr>
              )) }
              { (invoice.tax > 0 || invoice.discount > 0) &&
                <tr className="total">
                  <td colSpan="3">SUBTOTAL</td>
                  <td>{ numeral(invoice.subtotal).format('0.00') }</td>
                </tr>
              }
              { invoice.tax > 0 &&
                <tr>
                  <td colSpan="3">Tax</td>
                  <td>{ numeral(invoice.tax).format('0.00') }</td>
                </tr>
              }
              { invoice.discount > 0 &&
                <tr>
                  <td colSpan="3">
                    { invoice.coupon.amount &&
                      numeral(invoice.coupon.amount).format('$0.00')
                    }
                    { invoice.coupon.percent &&
                      numeral(invoice.coupon.percent).format('0.0%')
                    } discount
                    (coupon code { invoice.coupon.code })
                  </td>
                  <td>-{ numeral(invoice.discount).format('0.00') }</td>
                </tr>
              }
              <tr className="total">
                <td colSpan="3">TOTAL</td>
                <td>{ numeral(invoice.total).format('0.00') }</td>
              </tr>
              { invoice.payments.map((payment, index) => (
                <tr key={`payment_${index}`}>
                  <td colSpan="3">
                    <img src={`/admin/images/payments/${ this._getImage(payment) }.png`} />
                    { this._getMethod(payment) } on { moment(payment.date).format('MM/DD/YYYY')}
                  </td>
                  <td>-{ numeral(payment.amount).format('0.00') }</td>
                </tr>
              )) }
              <tr className="total">
                <td colSpan="3">BALANCE DUE</td>
                <td>{ numeral(invoice.balance).format('0.00') }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getMethod({ method, card_type, reference }) {
    if(method === 'paypal') return `Charged ${method.toUpperCase()}-${reference}`
    if(method === 'card') return `Charged ${card_type.toUpperCase()}-${reference}`
    if(method === 'scholarship') return 'Applied scholarship'
    if(method === 'credit') return 'Applied customer credit'
    return `Charged ${card_type.toUpperCase()}-${reference} with ${method.toUpperCase()}`
  }

  _getImage({ method, card_type }) {
    if(method === 'paypal') return 'paypal'
    return `${method}-${card_type}`
  }

}

export default Invoice
