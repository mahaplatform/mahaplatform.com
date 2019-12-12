import { ApplePay, Button, GooglePay, PayPal } from 'maha-public'
import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'
import Card from '../card'
import ACH from '../ach'

class Methods extends React.PureComponent {

  static propTypes = {}

  static defaultProps = {
    onSubmit: PropTypes.func
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-invoice-footer-button">
          { window.ApplePaySession &&
            <div className="finance-invoice-footer-button">
              <ApplePay { ...this._getPayButton() } />
            </div>
          }
          <div className="finance-invoice-footer-button">
            <GooglePay { ...this._getPayButton() } />
          </div>
          <div className="finance-invoice-footer-button">
            <PayPal { ...this._getPayButton() } />
          </div>
          <div className="finance-invoice-footer-button">
            <Button { ...this._getCard() } />
          </div>
          <div className="finance-invoice-footer-button">
            <Button { ...this._getBank() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {

    }
  }

  _getCard() {
    return {
      label: 'Credit Card',
      color: 'red',
      modal: Card
    }
  }

  _getBank() {
    return {
      label: 'Bank Account',
      color: 'violet',
      modal: ACH
    }
  }

  _getPayButton() {
    const { invoice, token } = window
    return {
      onChoose: () => {},
      invoice,
      token,
      onSuccess: this._handleSubmit
    }
  }

  _handleSubmit({ nonce }) {
    const { invoice } = window
    this.props.onSubmit(invoice.code, nonce)
  }

}

export default Methods
