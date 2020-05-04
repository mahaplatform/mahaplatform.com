import RecipientToken from '../../../tokens/recipient'
import PurposeToken from '../../../tokens/purpose'
import fields from '../../contacts/criteria'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object
  }

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { campaign } = this.props
    return {
      title: 'Edit SMS Campaign',
      method: 'patch',
      endpoint: `/api/admin/crm/campaigns/sms/${campaign.id}/edit`,
      action: `/api/admin/crm/campaigns/sms/${campaign.id}`,
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            ...this._getCampaign()
          ]
        }
      ]
    }
  }

  _getCampaign() {
    const { campaign } = this.props
    if(campaign.direction === 'inbound') {
      return [
        { label: 'Trigger Term', name: 'term', type: 'textfield', placeholder: 'Enter a trigger term', required: true }
      ]
    } else if(campaign.direction === 'outbound') {
      return [
        { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken },
        { label: 'To', type: 'segment', fields: [
          { name: 'strategy', type: 'dropdown', options: [
            { value: 'contacts', text: 'Specific contacts' },
            { value: 'list', text: 'Contacts in a list' },
            { value: 'filter', text: 'Contacts in a saved filter' },
            { value: 'criteria', text: 'Contacts that meet specific criteria' }
          ], value: 'value', text: 'text' },
          ...this._getToField()
        ] }
      ]
    }
  }

  _getToField() {
    const { campaign } = this.props
    const { config } = this.state
    const { program } = campaign
    if(config.strategy === 'contacts') {
      return [
        { name: 'contact_ids', type: 'lookup2', placeholder: 'Choose contacts', endpoint: '/api/admin/crm/contacts', filter: { phone: { $nnl: true } }, multiple: true, value: 'id', text: 'display_name', defaultValue: config.contact_ids, format: (contact) => <RecipientToken recipient={{ contact, phone_number: { number: contact.phone } } } /> }
      ]
    } else if(config.strategy === 'list') {
      return [
        { name: 'list_id', type: 'lookup', placeholder: 'Choose a list', endpoint: `/api/admin/crm/programs/${program.id}/lists`, value: 'id', text: 'title', defaultValue: config.list_id }
      ]
    } else if(config.strategy === 'filter') {
      return [
        { name: 'filter_id', type: 'lookup', placeholder: 'Choose a filter', endpoint: '/api/admin/admin-crm-contacts/filters', value: 'id', text: 'title', defaultValue: config.filter_id }
      ]
    } else if(config.strategy === 'criteria') {
      return [
        { name: 'criteria', type: 'criteriafield', ...this._getCriteriaField(), defaultValue: config.criteria }
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
    const { campaign } = this.props
    const { config } = this.state
    return {
      comment: <p>{ this._getComment(config.purpose) }</p>,
      endpoint: `/api/admin/crm/programs/${campaign.program.id}/${config.purpose}/sms/recipients`,
      entity: 'contact',
      format: (recipient) => <RecipientToken recipient={recipient} channel="email" />,
      fields,
      title: 'Select Contacts',
      defaultValue: []
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Edit)
