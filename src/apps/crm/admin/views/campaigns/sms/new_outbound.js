import PurposeToken from '../../../tokens/purpose'
import ToField from '../../../components/tofield'
import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.PureComponent {

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
    const { config } = this.state
    return {
      title: 'New Outbound SMS Campaign',
      method: 'post',
      action: '/api/admin/crm/campaigns/sms',
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
            { label: 'Purpose', name: 'purpose', type: 'radiogroup', deselectable: false, options: ['marketing','transactional'], required: true, format: PurposeToken, defaultValue: 'marketing' },
            { label: 'To', name: 'to', type: ToField, program_id, channel: 'sms', purpose: config.purpose }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleSuccess(campaign) {
    this.context.router.history.push(`/crm/campaigns/sms/${campaign.id}`)
    this.context.modal.close()
  }

}

export default New
