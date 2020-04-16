import TemplateField from '../../../components/templatefield'
import RecipientToken from '../../../tokens/recipient'
import PurposeToken from '../../../tokens/purpose'
import fields from '../../contacts/criteria'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    user: PropTypes.object,
    onBack: PropTypes.func
  }

  state = {
    purpose: 'marketing'
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id, user } = this.props
    const { purpose } = this.state
    return {
      title: 'New Email Campaign',
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
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: purpose },
            { label: 'To', name: 'to', type: 'criteriafield', ...this._getCriteriaField() },
            { type: 'segment', fields: [
              { label: 'Template', name: 'template_id', type: TemplateField, program_id },
              { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, filter: { is_verified: { $eq: 'true' } }, value: 'id', text: 'rfc822', required: true },
              { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: user.email },
              { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true }
            ] }
          ]
        }
      ]
    }
  }

  _getComment(purpose) {
    if(purpose === 'marketing') {
      return `
        Marketing emails can only be sent to contacts who have given their
        explicit consent. You will only see contacts who match your criteria
        and have opted in to receive email from this program
      `
    }
    if(purpose === 'transactional') {
      return `
        Transactional emails will be sent to the primary email address of each
        contact that matches your criteria.
      `
    }
  }

  _getCriteriaField() {
    const { program_id } = this.props
    const { purpose } = this.state
    return {
      comment: <p>{ this._getComment(purpose) }</p>,
      endpoint: `/api/admin/crm/programs/${program_id}/${purpose}/email/recipients`,
      entity: 'contact',
      format: (recipient) => <RecipientToken recipient={recipient} channel="email" />,
      fields,
      title: 'Select Contacts',
      defaultValue: []
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChangeField(key, value) {
    if(key === 'purpose') {
      this.setState({
        purpose: value
      })
    }
  }

  _handleSuccess(campaign) {
    this.context.router.history.push(`/admin/crm/campaigns/email/${campaign.id}`)
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(New)
