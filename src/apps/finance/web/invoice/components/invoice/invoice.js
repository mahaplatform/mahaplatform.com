import PropTypes from 'prop-types'
import Payment from '../payment'
import numeral from 'numeral'
import moment from 'moment'
import Logo from '../logo'
import React from 'react'

class Invoice extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    status: PropTypes.string,
    onFetch: PropTypes.func
  }

  _handlePayment = this._handlePayment.bind(this)

  render() {
    const { invoice, status } = this.props
    if(status !== 'success') return null
    return (
      <div className="finance-invoice">
        <div className="finance-invoice-body">
          <div className="finance-invoice-document">
            <div className="finance-invoice-row">
              <div className="finance-invoice-col finance-invoice-status">
                { invoice.status !== 'unpaid' &&
                  <img src={`/admin/images/payments/${invoice.status}.png`} />
                }
              </div>
              <div className="finance-invoice-col">
                <table>
                  <tbody>
                    <tr>
                      <td>Invoice ID</td>
                      <td>{ invoice.code }</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{ moment(invoice.date).format('MMM DD, YYYY') }</td>
                    </tr>
                    <tr>
                      <td>Due</td>
                      <td>{ moment(invoice.due).format('MMM DD, YYYY') }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="finance-invoice-row">
              <div className="finance-invoice-col">
                <div className="finance-invoice-box">
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
                </div>
              </div>
              <div className="finance-invoice-col">
                <div className="finance-invoice-box">
                  <strong>{ invoice.customer.display_name }</strong><br />
                  { invoice.customer.email }
                </div>
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
                      <td>{ line_item.description }</td>
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
                        { invoice.discount_amount &&
                          numeral(invoice.discount_amount).format('$0.00')
                        }
                        { invoice.discount_percent &&
                          numeral(invoice.discount_percent).format('0.0%')
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
                    <tr key={`payment_${index}`} className={ this._getPaymentClass(payment) }>
                      <td colSpan="3">
                        <span>
                          { this._getMethod(payment) } on { moment(payment.date).format('MM/DD/YYYY') }
                        </span> { payment.voided_date &&
                          `(voided on ${ moment(payment.voided_date).format('MM/DD/YYYY') })`
                        }
                      </td>
                      <td><span>-{ numeral(payment.amount).format('0.00') }</span></td>
                    </tr>
                  )) }
                  { invoice.payments.length > 0 &&
                    <tr className="total">
                      <td colSpan="3">BALANCE DUE</td>
                      <td>{ numeral(invoice.balance).format('0.00') }</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            { invoice.notes &&
              <div className="finance-invoice-notes">
                { invoice.notes }
              </div>
            }
          </div>
        </div>
        <div className="finance-invoice-footer">
          <div className="finance-invoice-footer-inner">
            <div className="ui fluid button" onClick={ this._handlePayment }>
              Pay Invoice
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const parts = window.location.pathname.match(/\/invoices\/(.*)/)
    this.props.onFetch(parts[1])
  }

  _getPaymentClass(payment) {
    const classes = []
    if(payment.voided_date) classes.push('voided')
    return classes.join(' ')

  }

  _getMethod(props) {
    const { description, method } = props
    if(method === 'paypal') return `Charged ${description}`
    if(method === 'card') return `Charged ${description}`
    if(method === 'googlepay') return `Charged ${description} via GooglePay`
    if(method === 'applepay') return `Charged ${description} via ApplePay`
    if(method === 'check') return `Received check (${description})`
    if(method === 'scholarship') return 'Applied scholarship'
    if(method === 'credit') return 'Applied customer credit'
    if(method === 'cash') return 'Received cash'
  }

  _handlePayment() {
    this.context.modal.open(Payment)
  }

}

export default Invoice
