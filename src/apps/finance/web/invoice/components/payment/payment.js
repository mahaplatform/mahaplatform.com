import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class Payment extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const methods = [
      { label: 'Apple Pay', name: 'applepay' },
      { label: 'Google Pay', name: 'googlepay' },
      { label: 'PayPal', name: 'paypal' },
      { label: 'Credit Card', name: 'card' },
      { label: 'Bank Account', name: 'ach' }
    ]
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-methods">
          { methods.map((method, index) => (
            <div className="finance-payment-method" key={`method_${index}`}>
              <div className="finance-payment-method-mark">
                <img src={`/admin/images/payments/${method.name}-mark.png`} />
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


}

export default Payment
