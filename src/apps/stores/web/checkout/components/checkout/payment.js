import { Loader, Payment } from '@client'
import PropTypes from 'prop-types'
import React from 'react'

class PaymentStep extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    items: PropTypes.array,
    Store: PropTypes.object,
    token: PropTypes.string,
    total: PropTypes.number,
    onDone: PropTypes.func
  }

  render() {
    const { total } = this.props
    return (
      <div className="maha-checkout-panel">
        <div className="maha-checkout-panel-body">
          <div className="maha-checkout-panel-content">
            <div className="maha-checkout-step2">
              { total > 0 ?
                <Payment { ...this._getPayment() } /> :
                <Loader label="Processing" />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getPayment() {
    const { data, items, Store, token, total, onDone } = this.props
    const { code, program, settings } = Store
    return {
      amount: total,
      data,
      endpoint: `/api/stores/stores/${code}/orders`,
      items,
      program,
      settings,
      token,
      onSuccess: onDone
    }
  }

}

export default PaymentStep
