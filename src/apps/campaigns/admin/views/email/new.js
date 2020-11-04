import TemplateField from '../../../../crm/admin/components/templatefield'
import PurposeToken from '../../tokens/purpose'
import ToField from '../../components/tofield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    user: PropTypes.object,
    onBack: PropTypes.func
  }

  state = {
    config: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id } = this.props
    const { admin } = this.context
    const { config } = this.state
    return {
      title: 'New Email Campaign',
      method: 'post',
      action: '/api/admin/campaigns/email',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', deselectable: false, options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: 'marketing' },
            { label: 'To', name: 'to', type: ToField, program_id, channel: 'email', purpose: config.purpose },
            { label: 'Email Details', type: 'segment', fields: [
              { label: 'Template', name: 'template_id', type: TemplateField, program_id },
              { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, filter: { is_verified: { $eq: 'true' } }, value: 'id', text: 'rfc822', required: true },
              { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: admin.user.email },
              { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true }
            ] }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleSuccess(campaign) {
    this.context.router.history.push(`/campaigns/email/${campaign.id}`)
    this.context.modal.close()
  }

}

export default New
