import { Form, UserToken } from '@admin'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

class Export extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    filter: PropTypes.object,
    onSuccess: PropTypes.func
  }

  state = {
    data: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { admin } = this.context
    return {
      title: 'Export Invoices',
      saveText: 'Export',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Strategy', name: 'strategy', type: 'radiogroup', deselectable: false, required: true, options: [
              { value: 'self', text:  <span dangerouslySetInnerHTML={{ __html: `Email the export file to <strong>${admin.user.email}</strong>` }} /> },
              { value: 'user', text: 'Email the export file to another user' },
              { value: 'email', text: 'Email the export file to email address' }
            ], defaultValue: 'self' },
            ...this._getTarget()
          ]
        }
      ]
    }
  }

  _getEmail(data) {
    const { admin } = this.context
    const { email, strategy, user } = data
    if(strategy === 'self') return { value: admin.user.email, text: admin.user.email }
    if(strategy === 'user') return { value: user.email, text: user.full_name }
    if(strategy === 'email') return { value: email, text: email }
  }

  _getTarget() {
    const { data } = this.state
    const fields = []
    if(data.strategy === 'email') {
      fields.push({ name: 'email', type: 'emailfield', required: true })
    } else if(data.strategy === 'user') {
      fields.push({ name: 'user', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true } }, text: 'full_name', format: UserToken })
    }
    if(data.strategy !== 'download') {
      fields.push({ name: 'subject', type: 'textfield', required: true, defaultValue: 'Invoice Export' })
      fields.push({ name: 'message', type: 'textarea', rows: 5, required: true, defaultValue: 'Here are your invoices' })
    }
    return [{ label: 'Email', type: 'segment', required: true, fields }]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(data) {
    this.setState({ data })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(data) {
    this._handleSend(data)
  }

  _handleSend(data) {
    const { filter } = this.props
    const email = this._getEmail(data)
    this.context.network.request({
      endpoint: '/api/admin/finance/invoices/export',
      method: 'post',
      body: {
        filter,
        to: email.value,
        subject: data.subject,
        message: data.message
      },
      onFailure: () => this.context.flash.set('error', 'Unable to export data'),
      onSuccess: () => {
        this.context.flash.set('success', (
          <Fragment>
            After your export has been generated, an email will be sent to <strong>{ email.text }</strong>
          </Fragment>
        ))
        this.props.onSuccess()
        this.context.modal.close()
      }
    })
  }

}

export default Export
