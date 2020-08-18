import { Button, Form } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Step1 extends React.Component {

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
              <Form { ...this._getForm() } />
            </div>
          </div>
        </div>
        <div className="maha-checkout-panel-footer">
          <div className="maha-checkout-panel-footer-item" />
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
    const fields = this._getFields()
    return {
      reference: node => this.form = node,
      button: false,
      captcha: false,
      onSubmit: this._handleSubmit,
      fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'Enter first name', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Enter last name', required: true },
        { label: 'Email', name: 'email', type: 'emailfield', placeholder: 'Enter email', required: true },
        ...fields.map(field => ({
          type: field.contactfield ? field.contactfield.type : field.type,
          ..._.omit(field, ['contactfield','code','type']),
          ...field.config || {},
          name: field.code
        }))
      ]
    }
  }

  _getFields() {
    const { Store } = this.props
    return Store.contact_config ? Store.contact_config.fields : []
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

export default Step1
