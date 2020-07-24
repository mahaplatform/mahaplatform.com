import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Allocations = ({ refund, allocations }) =>(
  <table className="ui celled compact unstackable table">
    <thead>
      <tr>
        <th>Description</th>
        <th className="collapsing">Total</th>
      </tr>
    </thead>
    <tbody>
      { allocations.map((allocation, index) => (
        <tr key={`payment_${index}`}>
          <td>{ allocation.line_item.description }</td>
          <td className="right aligned">{ numeral(allocation.total).format('0.00') }</td>
        </tr>
      )) }
      <tr>
        <td>Total</td>
        <td className="right aligned">{ numeral(refund.amount).format('0.00') }</td>
      </tr>
    </tbody>
  </table>
)

Allocations.propTypes = {
  allocations: PropTypes.array,
  refund: PropTypes.object
}

export default Allocations
