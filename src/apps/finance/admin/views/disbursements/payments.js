import PaymentTypeToken from '../../tokens/payment_type'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Payments = ({ disbursement, payments }, { router }) => {

  const _handleClick = (payment) => {
    router.history.push(`/admin/finance/payments/${payment.id}`)
  }

  return (
    <table className="ui celled compact table">
      <thead>
        <tr>
          <th className="collapsing" />
          <th>Method</th>
          <th className="collapsing">Date</th>
          <th className="collapsing">Amount</th>
          <th className="collapsing">Fee</th>
        </tr>
      </thead>
      <tbody>
        { payments.map((payment, index) => (
          <tr key={`payment_${index}`} onClick={ _handleClick.bind(this, payment) }>
            <td><PaymentTypeToken { ...payment } /></td>
            <td>{ payment.description }</td>
            <td>{ moment(payment.date).format('MM/DD/YYYY') }</td>
            <td className="right aligned">{ numeral(payment.amount).format('0.00') }</td>
            <td className="right aligned">{ numeral(payment.fee).format('0.00') }</td>
          </tr>
        )) }
        <tr>
          <td colSpan="3">Total</td>
          <td className="right aligned">{ numeral(disbursement.total).format('0.00') }</td>
          <td className="right aligned">{ numeral(disbursement.fees).format('0.00') }</td>
        </tr>
      </tbody>
    </table>
  )

}

Payments.contextTypes = {
  router: PropTypes.object
}

Payments.propTypes = {
  payments: PropTypes.array
}

export default Payments
