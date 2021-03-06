import PropTypes from 'prop-types'
import { Logo } from '@admin'
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
        <div className="finance-invoice-row">
          <div className="finance-invoice-col finance-invoice-status">
            { invoice.status !== 'unpaid' &&
              <img src={`/images/payments/${invoice.status}.png`} />
            }
          </div>
          <div className="finance-invoice-col">
            <div className="finance-invoice-details">
              <div className="finance-invoice-details-code">
                <img src={`/finance/invoices/${invoice.code}/code`} />
              </div>
              <div className="finance-invoice-details-data">
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
                  { invoice.program.address &&
                    <span dangerouslySetInnerHTML={{ __html: invoice.program.address.replace(/\n/g,'<br />') }} />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="finance-invoice-col">
            <div className="finance-invoice-box">
              <strong>{ invoice.customer.display_name }</strong><br />
              { invoice.customer.address &&
                <div>
                  <div>{ invoice.customer.address.street_1 }</div>
                  { invoice.customer.address.street_2 &&
                    <div>{ invoice.customer.address.street_2 }</div>
                  }
                  <div>
                    { invoice.customer.address.city }, { invoice.customer.address.state_province } { invoice.customer.address.postal_code }
                  </div>
                </div>
              }
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
                  <td>
                    { line_item.description } { line_item.is_tax_deductible &&
                      <span className="finance-invoice-asterix">*</span>
                    }
                  </td>
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
                  <td colSpan="3">Discount</td>
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
                      { payment.activity } on { moment(payment.date).format('MM/DD/YYYY') }
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
        { invoice.tax_deductible > 0 &&
          <div className="finance-invoice-footnote">
            <span className="finance-invoice-asterix">*</span> No substantial goods or services were provided in return for this gift
          </div>
        }
        { invoice.notes &&
          <div className="finance-invoice-notes">
            { invoice.notes }
          </div>
        }
        { invoice.tax_deductible > 0 &&
          <div className="finance-invoice-tax-deductible">
            <strong>Charitable Contribution</strong><br/>
            Eligible amount of contribution for tax purposes: { numeral(invoice.tax_deductible).format('0.00') }
          </div>
        }
      </div>
    )
  }

  _getPaymentClass(payment) {
    const classes = []
    if(payment.voided_date) classes.push('voided')
    return classes.join(' ')
  }

}

export default Invoice
