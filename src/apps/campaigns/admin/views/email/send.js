import ToField from '../../components/tofield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

const strategies = [
  { value: 'now', text: 'Send immediately' },
  { value: 'schedule', text: 'Schedule Delivery' }
]

class Send extends React.Component {

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
      title: 'Send Campaign',
      method: 'patch',
      endpoint: `/api/admin/campaigns/email/${campaign.id}/edit`,
      action: `/api/admin/campaigns/email/${campaign.id}/send`,
      saveText: 'Send',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'To', name: 'to', type: ToField, program_id: campaign.program.id, channel: 'email', required: true, purpose: campaign.purpose, defaultValue: campaign.to },
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

export default Send
