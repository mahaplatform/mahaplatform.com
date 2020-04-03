import PropTypes from 'prop-types'
import React from 'react'
import numeral from 'numeral'

class Summary extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    discount: PropTypes.number,
    event: PropTypes.object,
    items: PropTypes.array,
    payment: PropTypes.object,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number
  }

  render() {
    const { contact, discount, items, payment, subtotal, tax, total } = this.props
    return (
      <div className="registration-summary">
        <div className="registration-summary-section">
          <h2>Tickets</h2>
          <table>
            <thead>
              <tr>
                <td>Item</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              { items.length === 0 &&
                <tr>
                  <td colSpan="2">No tickets</td>
                </tr>
              }
              { items.map((item, index) => (
                <tr key={`ticket_type_${index}`}>
                  <td>{ item.name } x { item.quantity }</td>
                  <td>{ numeral(item.total).format('0.00') }</td>
                </tr>
              ))}
              { (tax > 0 || discount > 0) &&
                <tr>
                  <td className="registration-summary-total">Subtotal</td>
                  <td>{ numeral(subtotal).format('0.00') }</td>
                </tr>
              }
              { tax > 0 &&
                <tr>
                  <td>Tax</td>
                  <td>0.00</td>
                </tr>
              }
              { discount > 0 &&
                <tr>
                  <td>Discount (15%)</td>
                  <td>-15.00</td>
                </tr>
              }
              <tr>
                <td className="registration-summary-total">Total</td>
                <td>{ numeral(total).format('0.00') }</td>
              </tr>
            </tbody>
          </table>
        </div>
        { contact &&
          <div className="registration-summary-section">
            <h2>Customer</h2>
            { contact.first_name } { contact.last_name }<br />
            { contact.email }
          </div>
        }
        { payment &&
          <div className="registration-summary-section">
            <h2>Payment</h2>
            <div className="registration-summary-payment">
              <img src={`/admin/images/payments/${payment.card_type}.png` } />
              { payment.card_type.toUpperCase() }-{ payment.last_four }<br />
            </div>
          </div>
        }
      </div>
    )
  }

}

export default Summary
