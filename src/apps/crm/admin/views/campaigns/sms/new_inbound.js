import ImportToken from '../../../../../maha/admin/tokens/import'
import RecipientToken from '../../../tokens/recipient'
import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
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
    const { program_id } = this.props
    return {
      title: 'New Inbound SMS Campaign',
      method: 'post',
      action: '/api/admin/crm/campaigns/sms',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { name: 'direction', type: 'hidden', defaultValue: 'inbound' },
            { label: 'Trigger Term', name: 'term', type: 'textfield', placeholder: 'Enter a trigger term', required: true }
          ]
        }
      ]
    }
  }

  // _getDirection() {
  //   const { purpose } = this.state
  //   if(direction === 'inbound') {
  //     return [
  //       { label: 'Trigger Term', name: 'term', type: 'textfield', placeholder: 'Incoming text message' }
  //     ]
  //   }
  // }

  _getComment(purpose) {
    if(purpose === 'marketing') {
      return `
        Marketing text messages can only be sent to contacts who have given
        their explicit consent. You will only see contacts who match your
        criteria and have opted in to receive text messages from this program
      `
    }
    if(purpose === 'transactional') {
      return `
        Transactional text messages will be sent to the primary phone number
        of each contact that matches your criteria.
      `
    }
  }

  _getCriteriaField() {
    const { program_id } = this.props
    const { purpose } = this.state
    return {
      comment: <p>{ this._getComment(purpose) }</p>,
      endpoint: `/api/admin/crm/programs/${program_id}/${purpose}/sms/recipients`,
      entity: 'contact',
      format: (recipient) => <RecipientToken recipient={recipient} channel="sms" />,
      fields: [
        { label: 'Contact', fields: [
          { name: 'first name', key: 'first_name', type: 'text' },
          { name: 'last name', key: 'last_name', type: 'text' },
          { name: 'email', key: 'email', type: 'text' },
          { name: 'phone', key: 'phone', type: 'text' },
          { name: 'street_1', key: 'street_1', type: 'text' },
          { name: 'city', key: 'city', type: 'text' },
          { name: 'state/province', key: 'state_province', type: 'text' },
          { name: 'postal code', key: 'postal_code', type: 'text' },
          { name: 'birthday', key: 'birthday', type: 'text' },
          { name: 'spouse', key: 'spouse', type: 'text' }
        ] },
        { label: 'Classifications', fields: [
          { name: 'interests', key: 'topic_id', type: 'select', endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', comparisons: [
            { value: '$eq', text: 'is interested in' },
            { value: '$neq', text: 'is not interested in' },
            { value: '$in', text: 'is interested in one of' },
            { value: '$nin', text: 'is not interested in one of' }
          ] },
          { name: 'lists', key: 'list_id', type: 'select', endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', comparisons: [
            { value: '$eq', text: 'belongs to' },
            { value: '$neq', text: 'does not belong to' },
            { value: '$in', text: 'belongs to one of' },
            { value: '$nin', text: 'does not belongs to one of' }
          ] },
          { name: 'organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', text: 'name', value: 'id' },
          { name: 'tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id' }
        ] },
        { label: 'Activities', fields: [
          { name: 'Form', key: 'form_id', type: 'select', endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$eq', text: 'filled out' },
            { value: '$neq', text: 'did not fill out' }
          ] },
          { name: 'Import', key: 'import_id', type: 'select', endpoint: '/api/admin/crm/imports', filter:  { stage: { $eq: 'complete' } }, text: 'description', value: 'id', subject: false, format: ImportToken, comparisons: [
            { value: '$eq', text: 'was included in import' },
            { value: '$neq', text: 'was not included in import' }
          ] },
          { name: 'Email Delivery', key: 'email_campaign_id', type: 'select', endpoint: '/api/admin/crm/campaigns', filter: { type: { $eq: 'email' }, status: { $eq: 'sent' } }, text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$de', text: 'received the email' },
            { value: '$nde', text: 'did not receive the email' }
          ] },
          { name: 'Email Open', key: 'email_campaign_id', type: 'select', endpoint: '/api/admin/crm/campaigns', filter: { type: { $eq: 'email' }, status: { $eq: 'sent' } }, text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$op', text: 'opened the email' },
            { value: '$nop', text: 'did not open the email' }
          ] },
          { name: 'Email Click', key: 'email_campaign_id', type: 'select', endpoint: '/api/admin/crm/campaigns', filter: { type: { $eq: 'email' }, status: { $eq: 'sent' } }, text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$cl', text: 'clicked link in the email' },
            { value: '$ncl', text: 'did not click link in the email' }
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
    this.context.router.history.push(`/admin/crm/campaigns/sms/${campaign.id}`)
    this.context.modal.close()
  }

}

export default SMS
