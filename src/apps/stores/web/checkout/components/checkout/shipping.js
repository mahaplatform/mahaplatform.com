import { Button, Form } from '@client'
import PropTypes from 'prop-types'
import React from 'react'

class ShippingStep extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    Store: PropTypes.object,
    onBack: PropTypes.func,
    onNext: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="maha-checkout-panel">
        <div className="maha-checkout-panel-body">
          <div className="maha-checkout-panel-content">
            <div className="maha-checkout-step1">
              <p>
                One or more of the products you are ordering requires shipping.
                Please enter your shipping address so we can send it to you!
              </p>
              <Form { ...this._getForm() } />
            </div>
          </div>
        </div>
        <div className="maha-checkout-panel-footer">
          <div className="maha-checkout-panel-footer-item">
            <Button { ...this._getBack() } />
          </div>
          <div className="maha-checkout-panel-footer-item">
            <Button { ...this._getNext() } />
          </div>
        </div>
      </div>
    )
  }

  _getBack() {
    return {
      label: '&laquo; Back',
      color: 'red',
      handler: this._handleBack
    }
  }

  _getForm() {
    return {
      reference: node => this.form = node,
      button: false,
      captcha: false,
      onSubmit: this._handleSubmit,
      fields: [
        { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter name', required: true },
        { label: 'Address', name: 'address', type: 'addressfield', placeholder: 'Enter shipping address', required: true }
      ]
    }
  }

  _getNext() {
    return {
      label: 'Next &raquo;',
      color: 'red',
      handler: this._handleNext
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    this.form.submit()
  }

  _handleSubmit(data) {
    this.props.onNext(data)
  }

}

export default ShippingStep
