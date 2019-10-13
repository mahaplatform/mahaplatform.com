import PropTypes from 'prop-types'
import { Form, Logo } from 'maha-admin'
import React from 'react'

const PhoneNumberToken = ({ formatted, program }) => (
  <div className="program-token">
    <div className="program-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="program-token-label">
      <strong>{ program.title }</strong><br />
      { formatted }
    </div>
  </div>
)

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
            { label: 'From', name: 'from_number_id', type: 'lookup', endpoint: '/api/admin/team/phone_numbers', filter: { type: { $eq: 'voice' } }, value: 'id', text: 'formatted', format: PhoneNumberToken },
            { label: 'To', name: 'to_number_id', type: 'lookup', options: contact.phone_numbers, value: 'id', text: 'formatted' },
            { label: 'Message', name: 'body', type: 'textarea' },
            { label: 'Attachments', name: 'asset_ids', type: 'attachmentfield', multiple: true }
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
