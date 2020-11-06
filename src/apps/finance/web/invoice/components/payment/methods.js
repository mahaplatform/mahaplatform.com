import { ModalPanel } from '@public'
import GooglePay from './googlepay'
import PropTypes from 'prop-types'
import ApplePay from './applepay'
import PayPal from './paypal'
import React from 'react'
import Card from './card'
import ACH from './ach'

class Methods extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    token: PropTypes.string,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const methods = [
      { label: 'Google Pay', name: 'googlepay', component: GooglePay },
      { label: 'PayPal', name: 'paypal', component: PayPal },
      { label: 'Credit Card', name: 'card', component: Card },
      { label: 'Bank Account', name: 'ach', component: ACH }
    ]
    if(window.ApplePaySession) {
      methods.unshift({ label: 'Apple Pay', name: 'applepay', component: ApplePay })
    }
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-methods">
          { methods.map((method, index) => (
            <div className="finance-payment-method" key={`method_${index}`} onClick={ this._handleMethod.bind(this, method.component) }>
              <div className="finance-payment-method-mark">
                <img src={`/images/payments/${method.name}-mark.png`} />
              </div>
              <div className="finance-payment-method-label">
                { method.label }
              </div>
              <div className="finance-payment-method-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getMethod() {
    const { invoice, token, onPop, onDone } = this.props
    return {
      invoice,
      token,
      onBack: onPop,
      onDone
    }
  }

  _getPanel() {
    return {
      title: 'Choose Payment Method',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleMethod(component) {
    this.props.onPush(component, this._getMethod.bind(this))
  }

}

export default Methods
