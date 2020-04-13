import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Payments = ({ disbursement, payments }) => {

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
          <th className="collapsing">Total</th>
          <th className="collapsing">Fee</th>
          <th className="collapsing">Amount</th>
        </tr>
      </thead>
      <tbody>
        { payments.map((payment, index) => (
          <tr key={`payment_${index}`}>
            <td><Button { ...button(payment) } /></td>
            <td className="right aligned">{ numeral(payment.amount).format('0.00') }</td>
            <td className="right aligned">{ numeral(payment.fee).format('0.00') }</td>
            <td className="right aligned">{ numeral(payment.disbursed).format('0.00') }</td>
          </tr>
        )) }
        <tr>
          <td>Total</td>
          <td className="right aligned">{ numeral(disbursement.total).format('0.00') }</td>
          <td className="right aligned">{ numeral(disbursement.fee).format('0.00') }</td>
          <td className="right aligned">{ numeral(disbursement.amount).format('0.00') }</td>
        </tr>
      </tbody>
    </table>
  )

}

Payments.propTypes = {
  disbursement: PropTypes.array,
  payments: PropTypes.array
}

export default Payments
