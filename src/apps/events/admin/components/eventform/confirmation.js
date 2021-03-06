import TemplateField from '@apps/crm/admin/components/templatefield'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Confirmation extends React.PureComponent {

  static propTypes = {
    event: PropTypes.object,
    user: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    data: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event, user } = this.props
    const { program_id } = event
    const confirmation = event.confirmation || {}
    return {
      title: 'Confirmation Email',
      cancelIcon: 'chevron-left',
      saveText: 'Save',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, value: 'id', text: 'rfc822', required: true, defaultValue: confirmation.sender_id },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: confirmation.reply_to || user.email},
            { type: 'segment', fields: [
              { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true, defaultValue: confirmation.subject || 'Thank you for registering' },
              { label: 'Template', name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'template', text: 'Create email from an existing email template' },
                { value: 'new', text: 'Create email from a blank template' }
              ], required: true, defaultValue: 'template' },
              ...this._getTemplates()
            ] }
          ]
        }
      ]
    }
  }

  _getTemplates() {
    const { event } = this.props
    const { data } = this.state
    const { program_id } = event
    if(data.strategy === 'template' ) {
      return [
        { name: 'template_id', type: TemplateField, program_id }
      ]
    }
    return [
      { name: 'body', type: 'htmlfield', placeholder: 'Enter a body', required: true, defaultValue: `
        <p><%- contact.first_name %>,</p>
        <p>&nbsp;</p>
        <p>Thank your for registering!</p>
      ` }
    ]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(confirmation) {
    this.setState({ data: confirmation })
    this.props.onChange({ confirmation })
  }

  _handleSuccess(confirmation) {
    this.props.onDone({ confirmation })
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Confirmation)
