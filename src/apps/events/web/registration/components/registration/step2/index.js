import { Button, Form } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step2 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    items: PropTypes.array,
    onBack: PropTypes.func,
    onNext: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-step2">
              <Form { ...this._getForm() } />
            </div>
          </div>
        </div>
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
    return {
      label: '&laquo; Back',
      color: 'red',
      handler: this._handleBack
    }
  }

  _getForm() {
    const { event } = this.props
    const custom = event.contact_config ? event.contact_config.fields : []
    return {
      reference: node => this.form = node,
      button: false,
      captcha: false,
      onSubmit: this._handleSubmit,
      fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'Enter first name', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Enter last name', required: true },
        { label: 'Email', name: 'email', type: 'emailfield', placeholder: 'Enter email', required: true },
        ...custom.map(field => ({
          ...field,
          name: field.code
        }))
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

export default Step2
