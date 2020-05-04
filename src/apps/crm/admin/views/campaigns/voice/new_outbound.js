import RecipientToken from '../../../tokens/recipient'
import PurposeToken from '../../../tokens/purpose'
import fields from '../../contacts/criteria'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Voice extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
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
    return {
      title: 'New Outbound Voice Campaign',
      method: 'post',
      action: '/api/admin/crm/campaigns/voice',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { name: 'direction', type: 'hidden', defaultValue: 'outbound' },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: 'marketing' },
            { label: 'To', type: 'segment', fields: [
              { name: 'strategy', type: 'dropdown', options: [
                { value: 'contacts', text: 'Specific contacts' },
                { value: 'list', text: 'Contacts in a list' },
                { value: 'filter', text: 'Contacts in a filter' },
                { value: 'criteria', text: 'Contacts in a custom filter' }
              ], value: 'value', text: 'text' },
              ...this._getToField()
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
        { name: 'contact_ids', type: 'lookup2', placeholder: 'Choose contacts', endpoint: '/api/admin/crm/contacts', filter: { phone: { $nnl: true } }, multiple: true, value: 'id', text: 'display_name', defaultValue: config.contact_ids, format: (contact) => <RecipientToken recipient={{ contact, phone_number: { number: contact.phone } } } /> }
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
        Marketing calls can only be sent to contacts who have given their
        explicit consent. You will only see contacts who match your criteria
        and have opted in to receive call from this program
      `
    }
    if(purpose === 'transactional') {
      return `
        Transactional calls will be sent to the primary phone number of each
        contact that matches your criteria.
      `
    }
  }

  _getCriteriaField() {
    const { program_id } = this.props
    const { config } = this.state
    return {
      comment: <p>{ this._getComment(config.purpose) }</p>,
      endpoint: `/api/admin/crm/programs/${program_id}/${config.purpose}/voice/recipients`,
      entity: 'contact',
      format: (recipient) => <RecipientToken recipient={recipient} channel="voice" />,
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
    this.context.router.history.push(`/admin/crm/campaigns/voice/${campaign.id}`)
    this.context.modal.close()
  }

}

export default Voice
