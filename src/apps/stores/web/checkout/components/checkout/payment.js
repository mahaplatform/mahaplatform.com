import { Loader, Payment } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class PaymentStep extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    Store: PropTypes.object,
    token: PropTypes.string,
    total: PropTypes.number,
    onSubmit: PropTypes.func,
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

  componentDidMount() {
    const { total } = this.props
    if(total > 0) return
    this.props.onSubmit()
  }

  _getPayment() {
    const { data, Store, token, total, onDone } = this.props
    const { code, program, settings } = Store
    return {
      amount: total,
      data,
      endpoint: `/api/stores/stores/${code}/orders`,
      program,
      settings,
      token,
      onSuccess: onDone
    }
  }

}

export default PaymentStep
