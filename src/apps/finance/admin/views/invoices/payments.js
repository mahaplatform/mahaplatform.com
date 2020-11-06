import { Button } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Payments = ({ payments }) => {

  const button = (payment) => ({
    className: 'link',
    label: `${payment.method.toUpperCase()} ${payment.description ? `(${payment.description})` : ''}`,
    route: `/admin/finance/payments/${payment.id}`
  })

  return (
    <table className="ui celled compact unstackable table">
      <thead>
        <tr>
          <th>Description</th>
          <th className="collapsing">Date</th>
          <th className="collapsing">Amount</th>
        </tr>
      </thead>
      <tbody>
        { payments.map((payment, index) => (
          <tr key={`payment_${index}`}>
            <td>
              <Button { ...button(payment) } /> { payment.voided_date &&
                <span>(voided on {moment(payment.voided_date).format('MM/DD/YYYY') })</span>
              }
            </td>
            <td>{ moment(payment.date).format('MM/DD/YYYY') }</td>
            <td className="right aligned">{ numeral(payment.amount).format('0.00') }</td>
          </tr>
        )) }
      </tbody>
    </table>
  )

}

Payments.propTypes = {
  payments: PropTypes.array
}

export default Payments
