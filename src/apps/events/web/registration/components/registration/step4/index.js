import { Button, Loader } from 'maha-client'
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
    event: PropTypes.object,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    const methods = this._getMethods()
    const { status } = this.props
    return (
      <div className="registration-panel">
        { status !== 'pending' &&
          <div className="registration-panel-message">
            <Loader label="Processing" />
          </div>
        }
        { status === 'pending' &&
          <div className="registration-panel-body">
            <div className="registration-panel-content">
              <div className="registration-step4">
                <div className="registration-methods">
                  { methods.map((method, index) => (
                    <div className="registration-method" key={`method_${index}`} onClick={ this._handleMethod.bind(this, method.component) }>
                      <div className="registration-method-mark">
                        <img src={`/admin/images/payments/${method.name}-mark.png`} />
                      </div>
                      <div className="registration-method-label">
                        { method.label }
                      </div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </div>
        }
        <div className="registration-panel-footer">
          <div className="registration-panel-footer-item">
            <Button { ...this._getBack() } />
          </div>
          <div className="registration-panel-footer-item">
            <Button { ...this._getNext() } />
          </div>
        </div>
      </div>
    )
  }

  _getBack() {
    const { status } = this.props
    return {
      label: '&laquo; Back',
      color: 'red',
      disabled: status !== 'pending',
      handler: this._handleBack
    }
  }

  _getMethods() {
    const { event } = this.props
    const { payment_methods } = event.payment_config
    return payment_methods.map(name => {
      return _.find(methods, { name })
    })
  }

  _getNext() {
    const { status } = this.props
    return {
      label: 'Next &raquo;',
      color: 'red',
      disabled: status !== 'pending',
      handler: this._handleNext
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleMethod() {}

  _handleNext() {
    this.props.onSubmit({
      card_type: 'visa',
      last_four: 1234
    })
  }


}

export default Step4
