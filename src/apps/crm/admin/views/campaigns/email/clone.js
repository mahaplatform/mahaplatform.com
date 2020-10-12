import PurposeToken from '../../../tokens/purpose'
import ToField from '../../../components/tofield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Clone extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { campaign } = this.props
    return {
      title: 'Clone Email',
      method: 'patch',
      action: `/api/admin/crm/campaigns/email/${campaign.id}/clone`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter the title', required: true, defaultValue: `Copy of ${campaign.title}` },
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: campaign.purpose },
            { label: 'To', name: 'to', type: ToField, program_id: campaign.program.id, channel: 'email', purpose: campaign.purpose, defaultValue: campaign.to },
            { label: 'Email Details', type: 'segment', fields: [
              { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${campaign.program.id}/senders`, filter: { is_verified: { $eq: 'true' } }, value: 'id', text: 'rfc822', required: true, defaultValue: campaign.config.settings.sender_id },
              { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: campaign.config.settings.reply_to },
              { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true, defaultValue: campaign.config.settings.subject }
            ] }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(campaign) {
    this.context.flash.set('success', 'The template was successfully cloned')
    this.context.router.history.push(`/crm/campaigns/email/${campaign.id}`)
    this.context.modal.close()
  }

}

export default Clone
