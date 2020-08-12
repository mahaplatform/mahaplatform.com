import { Steps } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Checkout extends React.Component {

  static propTypes = {
  }

  state = {
    step: 0
  }

  render() {
    return (
      <div className="checkout">
        <div className="checkout-main">
          <div className="checkout-main-header">
            <Steps { ...this._getSteps() } />
          </div>
        </div>
        <div className="checkout-sidebar">
          sidebar
        </div>
      </div>
    )
  }

  _getSteps() {
    const { step } = this.state
    return {
      steps: ['Contact Information','Payment Information'],
      current: step
    }
  }

}

export default Checkout
