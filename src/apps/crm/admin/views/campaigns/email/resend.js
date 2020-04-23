import RecipientToken from '../../../tokens/recipient'
import fields from '../../contacts/criteria'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const strategies = [
  { value: 'now', text: 'Send immediately' },
  { value: 'schedule', text: 'Schedule Delivery' }
]

class Resend extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object
  }

  state = {
    strategy: 'now'
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { strategy } = this.state
    const { campaign } = this.props
    return {
      title: 'Resend Campaign',
      method: 'patch',
      action: `/api/admin/crm/campaigns/email/${campaign.id}/resend`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'To', name: 'to', type: 'criteriafield', ...this._getCriteriaField() },
            { label: 'Send At', name: 'strategy', type: 'radiogroup', options: strategies, required: true, defaultValue: strategy },
            ...strategy === 'schedule' ? [
              { label: 'Send At', type: 'segment', fields: [
                { label: 'Date', name: 'date', type: 'datefield', required: true },
                { label: 'Time', name: 'time', type: 'timefield', required: true }
              ] }
            ] : []
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
    const { campaign } = this.props
    return {
      comment: <p>{ this._getComment(campaign.purpose) }</p>,
      endpoint: `/api/admin/crm/programs/${campaign.program_id}/${campaign.purpose}/email/recipients`,
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

  _handleChangeField(key, value) {
    if(key === 'strategy') {
      this.setState({
        strategy: value
      })
    }
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Resend
