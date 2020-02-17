import RecipientToken from '../../../tokens/recipient'
import PurposeToken from '../../../tokens/purpose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Email extends React.PureComponent {

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
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: purpose },
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, filter: { is_verified: { $eq: 'true' } }, value: 'id', text: 'rfc822', required: true },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: user.email },
            { label: 'To', name: 'to', type: 'criteriafield', ...this._getCriteriaField() },
            { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true }
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
      fields: [
        { label: 'Contact', fields: [
          { name: 'First Name', key: 'first_name', type: 'text' },
          { name: 'Last Name', key: 'last_name', type: 'text' },
          { name: 'Email', key: 'email', type: 'text' },
          { name: 'Phone', key: 'phone', type: 'text' },
          { name: 'Street', key: 'street_1', type: 'text' },
          { name: 'City', key: 'city', type: 'text' },
          { name: 'State/Province', key: 'state_province', type: 'text' },
          { name: 'Postal Code', key: 'postal_code', type: 'text' },
          { name: 'Birthday', key: 'birthday', type: 'text' },
          { name: 'Spouse', key: 'spouse', type: 'text' }
        ] },
        { label: 'Classifications', fields: [
          { name: 'Interest', key: 'topic_id', type: 'select', endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$in', text: 'is interested in' },
            { value: '$nin', text: 'is not interested in' }
          ] },
          { name: 'List', key: 'list_id', type: 'select', endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$in', text: 'is subscribed to' },
            { value: '$nin', text: 'is not subscribed to' }
          ] },
          { name: 'Organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', subject: false, text: 'name', value: 'id', comparisons: [
            { value: '$in', text: 'belongs to' },
            { value: '$nin', text: 'does not belong to' }
          ] },
          { name: 'Tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id', subject: false, comparisons: [
            { value: '$in', text: 'is tagged with' },
            { value: '$nin', text: 'id not tagged with' }
          ] }
        ] },
        { label: 'Activities', fields: [
          { name: 'Form', key: 'form_id', type: 'select', endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$eq', text: 'filled out' },
            { value: '$neq', text: 'did not fill out' }
          ] }
        ] }
      ],
      title: 'Select Contacts'
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

export default connect(mapStateToProps)(Email)
