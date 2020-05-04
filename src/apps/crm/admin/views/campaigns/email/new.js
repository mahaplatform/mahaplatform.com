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
    config: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id, user } = this.props
    return {
      title: 'New Email Campaign',
      method: 'post',
      action: '/api/admin/crm/campaigns/email',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: 'marketing' },
            { label: 'To', type: 'segment', fields: [
              { name: 'strategy', type: 'dropdown', options: [
                { value: 'contacts', text: 'Specific contacts' },
                { value: 'list', text: 'Contacts in a list' },
                { value: 'filter', text: 'Contacts in a saved filter' },
                { value: 'criteria', text: 'Contacts that meet specific criteria' }
              ], value: 'value', text: 'text' },
              ...this._getToField()
            ] },
            { label: 'Email Details', type: 'segment', fields: [
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

  _getToField() {
    const { program_id } = this.props
    const { config } = this.state
    if(config.strategy === 'contacts') {
      return [
        { name: 'contact_ids', type: 'lookup2', placeholder: 'Choose contacts', endpoint: '/api/admin/crm/contacts', filter: { email: { $nnl: true } }, multiple: true, value: 'id', text: 'display_name', format: (contact) => <RecipientToken recipient={{ contact, phone_number: { number: contact.phone } } } /> }
      ]
    } else if(config.strategy === 'list') {
      return [
        { name: 'list_id', type: 'lookup', placeholder: 'Choose a list', endpoint: `/api/admin/crm/programs/${program_id}/lists`, value: 'id', text: 'title' }
      ]
    } else if(config.strategy === 'filter') {
      return [
        { name: 'filter_id', type: 'lookup', placeholder: 'Choose a filter', endpoint: '/api/admin/admin-crm-contacts/filters', value: 'id', text: 'title' }
      ]
    } else if(config.strategy === 'criteria') {
      return [
        { name: 'criteria', type: 'criteriafield', ...this._getCriteriaField() }
      ]
    }
    return []
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
    const { config } = this.state
    return {
      comment: <p>{ this._getComment(config.purpose) }</p>,
      endpoint: `/api/admin/crm/programs/${program_id}/${config.purpose}/email/criteria/recipients`,
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

  _handleChange(config) {
    this.setState({ config })
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
