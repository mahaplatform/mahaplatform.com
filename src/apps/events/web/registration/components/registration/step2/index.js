import { Button, Form } from '@client'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Step2 extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

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

  componentDidMount() {
    this.context.analytics.trackPageView('Step 2 - Contact Information')
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
    const { event } = this.props
    return event.contact_config ? event.contact_config.fields : []
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
