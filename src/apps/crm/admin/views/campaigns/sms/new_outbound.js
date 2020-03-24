import RecipientToken from '../../../tokens/recipient'
import PurposeToken from '../../../tokens/purpose'
import fields from '../../contacts/criteria'
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
    const { purpose } = this.state
    return {
      title: 'New Outbound SMS Campaign',
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
            { name: 'direction', type: 'hidden', defaultValue: 'outbound' },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: purpose },
            { label: 'To', name: 'to', type: 'criteriafield', ...this._getCriteriaField() }
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
    this.context.router.history.push(`/admin/crm/campaigns/sms/${campaign.id}`)
    this.context.modal.close()
  }

}

export default SMS
