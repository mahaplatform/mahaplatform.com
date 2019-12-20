import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Allocations = ({ payment, allocations }) =>(
  <table className="ui celled compact unstackable table">
    <thead>
      <tr>
        <th>Description</th>
        <th className="collapsing">Amount</th>
      </tr>
    </thead>
    <tbody>
      { allocations.map((allocation, index) => (
        <tr key={`payment_${index}`}>
          <td>{ allocation.description }</td>
          <td className="right aligned">{ numeral(allocation.amount).format('0.00') }</td>
        </tr>
      )) }
      <tr>
        <td>Total</td>
        <td className="right aligned">{ numeral(payment.amount).format('0.00') }</td>
      </tr>
    </tbody>
  </table>
)

Allocations.propTypes = {
  allocations: PropTypes.array,
  payment: PropTypes.object
}

export default Allocations
