import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Refunds = ({ refunds }) => {

  const button = (refund) => ({
    className: 'link',
    label: moment(refund.created_at).format('MM/DD/YYYY'),
    route: `/admin/finance/refunds/${refund.id}`
  })

  return (
    <table className="ui celled compact unstackable table">
      <thead>
        <tr>
          <th>Date</th>
          <th className="collapsing">Amount</th>
        </tr>
      </thead>
      <tbody>
        { refunds.map((refund, index) => (
          <tr key={`refund_${index}`}>
            <td><Button { ...button(refund) } /></td>
            <td className="right aligned">{ numeral(refund.amount).format('0.00') }</td>
          </tr>
        )) }
      </tbody>
    </table>
  )

}

Refunds.propTypes = {
  refunds: PropTypes.array
}

export default Refunds
