import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Email extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    user: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id, user } = this.props
    const filter = { program_id: { $eq: program_id } }
    return {
      title: 'New Email Blast',
      method: 'post',
      action: '/api/admin/crm/campaigns/email',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Template', name: 'template_id', type: 'lookup', placeholder: 'Choose a template', endpoint: '/api/admin/crm/templates', filter, value: 'id', text: 'title', required: true },
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: '/api/admin/crm/senders', filter, value: 'id', text: 'rfc822', required: true },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: user.email },
            { label: 'To', name: 'to', type: 'textfield', placeholder: 'Choose criteria'},
            { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChangeField(key, value) {
    if(key === 'program_id') {
      this.setState({
        program_id: value
      })
    }
  }

  _handleSuccess(campaign) {
    this.props.onDone(campaign)
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Email)
