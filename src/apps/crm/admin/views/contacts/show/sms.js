import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class SMS extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)


  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { contact } = this.props
    return {
      title: 'Send Message',
      method: 'post',
      action: `/api/admin/crm/contacts/${contact.id}/sms`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Number', name: 'number_id', type: 'lookup', endpoint: '/api/admin/team/numbers', filter: { type: { $eq: 'voice' } }, value: 'id', text: 'number' },
            { label: 'Phone Number', name: 'phone_number_id', type: 'lookup', options: contact.phone_numbers, value: 'id', text: 'number' },
            { label: 'Message', name: 'body', type: 'textarea' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default SMS
