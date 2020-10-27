import TemplateField from '../../../../crm/admin/components/templatefield'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Confirmation extends React.PureComponent {

  static propTypes = {
    event: PropTypes.object,
    user: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
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
    const confirmaton = event.confirmaton || {}
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
            { label: 'Template', name: 'template_id', type: TemplateField, program_id },
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, filter: { is_verified: { $eq: true } }, value: 'id', text: 'rfc822', required: true, defaultValue: confirmaton.sender_id },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: confirmaton.reply_to || user.email},
            { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true, defaultValue: confirmaton.subject || 'Thank you for registering' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(confirmation) {
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
