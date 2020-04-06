import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const methods = [
  { label: 'Credit Card', name: 'card', component: <div>Card</div> },
  { label: 'Bank Account', name: 'ach', component: <div>ACH</div> },
  { label: 'PayPal', name: 'paypal', component: <div>PayPal</div> },
  { label: 'Google Pay', name: 'googlepay', component: <div>GooglePay</div> },
  { label: 'ApplePay', name: 'applepay', component: <div>ApplePay</div> },
  { label: 'Pay at the door', name: 'door', component: <div>Pay at the door</div> }
]

class Step4 extends React.Component {

  static propTypes = {
    event: PropTypes.object
  }

  render() {
    const methods = this._getMethods()
    return (
      <div className="paymentmethodfield-methods">
        { methods.map((method, index) => (
          <div className="paymentmethodfield-method" key={`method_${index}`} onClick={ this._handleMethod.bind(this, method.component) }>
            <div className="paymentmethodfield-method-icon">
              <i className="fa fa-circle-o" />
            </div>
            <div className="paymentmethodfield-method-mark">
              <img src={`/admin/images/payments/${method.name}-mark.png`} />
            </div>
            <div className="paymentmethodfield-method-label">
              { method.label }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getMethods() {
    const { event } = this.props
    const { payment_methods } = event.payment_config
    return payment_methods.map(name => {
      return _.find(methods, { name })
    })
  }

  _handleMethod() {}

}

export default Step4
