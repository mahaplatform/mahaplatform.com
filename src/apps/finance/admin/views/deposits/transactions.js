import { Button } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Payments = ({ deposit, transactions }) => {

  const button = (transaction) => ({
    className: 'link',
    label: transaction.type === 'payment' ? transaction.payment.description : transaction.refund.description,
    route: transaction.type === 'payment' ? `/admin/finance/payments/${transaction.payment.id}` : `/admin/finance/refunds/${transaction.refund.id}`
  })

  return (
    <table className="ui celled compact unstackable table">
      <thead>
        <tr>
          <th>Description</th>
          <th className="collapsing">Type</th>
          <th className="collapsing">Total</th>
          <th className="collapsing">Fee</th>
          <th className="collapsing">Amount</th>
        </tr>
      </thead>
      <tbody>
        { transactions.map((transaction, index) => (
          <tr key={`payment_${index}`}>
            <td><Button { ...button(transaction) } /></td>
            <td>{ transaction.type.toUpperCase() }</td>
            <td className="right aligned">{ numeral(transaction.total).format('0.00') }</td>
            <td className="right aligned">{ numeral(transaction.fee).format('0.00') }</td>
            <td className="right aligned">{ numeral(transaction.amount).format('0.00') }</td>
          </tr>
        )) }
        <tr>
          <td colSpan="2">Total</td>
          <td className="right aligned">{ numeral(deposit.total).format('0.00') }</td>
          <td className="right aligned">{ numeral(deposit.fee).format('0.00') }</td>
          <td className="right aligned">{ numeral(deposit.amount).format('0.00') }</td>
        </tr>
      </tbody>
    </table>
  )

}

Payments.propTypes = {
  deposit: PropTypes.object,
  transactions: PropTypes.array
}

export default Payments
