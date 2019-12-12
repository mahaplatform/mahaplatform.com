import PropTypes from 'prop-types'
import React from 'react'

const PaymentMethods = ({ payment_methods }) => {

  return (
    <table className="ui celled compact unstackable table">
      <thead>
        <tr>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        { payment_methods.map((payment_method, index) => (
          <tr key={`card_${index}`}>
            <td>{ payment_method.description } </td>
          </tr>
        )) }
      </tbody>
    </table>
  )

}

PaymentMethods.propTypes = {
  payment_methods: PropTypes.array
}

export default PaymentMethods
