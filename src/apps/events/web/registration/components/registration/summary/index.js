import PropTypes from 'prop-types'
import React from 'react'
import numeral from 'numeral'

class Summary extends React.Component {

  static propTypes = {
    discount: PropTypes.number,
    event: PropTypes.object,
    items: PropTypes.array,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number
  }

  render() {
    const { discount, items, subtotal, tax, total } = this.props
    return (
      <div className="registration-summary">
        <table>
          <thead>
            <tr>
              <td>ITEM</td>
              <td>TOTAL</td>
            </tr>
          </thead>
          <tbody>
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
    )
  }

}

export default Summary
