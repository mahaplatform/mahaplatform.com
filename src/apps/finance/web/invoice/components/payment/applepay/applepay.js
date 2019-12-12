import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class ApplePay extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-applepay">
          <div className="finance-payment-applepay-body">
            ApplePay
          </div>
          <div className="finance-payment-applepay-footer">
            <div className="apple-pay-button apple-pay-button-white" />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'ApplePay'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ApplePay
