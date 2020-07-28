import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Credits = ({ credits, customer }) => {

  const button = (credit) => ({
    className: 'link',
    label: credit.id,
    route: `/admin/finance/customers/${customer.id}/credits/${credit.id}`
  })

  return (
    <table className="ui celled compact unstackable table">
      <thead>
        <tr>
          <th className="collapsing">ID</th>
          <th>Date</th>
          <th className="collapsing">Amount</th>
          <th className="collapsing">Balance</th>
        </tr>
      </thead>
      <tbody>
        { credits.map((credit, index) => (
          <tr key={`payment_${index}`}>
            <td>
              <Button { ...button(credit) } />
            </td>
            <td>{ moment(credit.date).format('MM/DD/YYYY') }</td>
            <td className="right aligned">{ numeral(credit.amount).format('0.00') }</td>
            <td className="right aligned">{ numeral(credit.balance).format('0.00') }</td>
          </tr>
        )) }
      </tbody>
    </table>
  )

}

Credits.propTypes = {
  credits: PropTypes.array,
  customer: PropTypes.object
}

export default Credits
