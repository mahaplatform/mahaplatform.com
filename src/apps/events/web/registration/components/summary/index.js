import PropTypes from 'prop-types'
import React from 'react'

class Summary extends React.Component {

  static propTypes = {}

  render() {
    return (
      <div className="registration-summary">
        <table>
          <thead>
            <tr>
              <td>ITEM</td>
              <td>QTY</td>
              <td>PRICE</td>
              <td>TOTAL</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>General Admission</td>
              <td>2</td>
              <td>50.00</td>
              <td>100.00</td>
            </tr>
            <tr>
              <td className="registration-summary-total" colSpan="3">Subtotal</td>
              <td>100.00</td>
            </tr>
            <tr>
              <td colSpan="3">Tax</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td colSpan="3">Discount (15%)</td>
              <td>-15.00</td>
            </tr>
            <tr>
              <td className="registration-summary-total" colSpan="3">Total</td>
              <td>85.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default Summary
