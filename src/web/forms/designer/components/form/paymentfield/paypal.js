import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.Component {

  static propTypes = {
  }

  state = {
    selected: null
  }

  render() {
    return (
      <div className="maha-paymentfield-form">
        PayPal
      </div>
    )
  }
}

export default PayPal
