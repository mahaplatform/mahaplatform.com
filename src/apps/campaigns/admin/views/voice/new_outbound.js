import PurposeToken from '../../tokens/purpose'
import ToField from '../../components/tofield'
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
    const { config } = this.state
    return {
      title: 'New Outbound Voice Campaign',
      method: 'post',
      action: '/api/admin/campaigns/voice',
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
            { label: 'To', name: 'to', type: ToField, program_id, channel: 'voice', purpose: config.purpose }          ]
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
    this.context.router.history.push(`/campaigns/voice/${campaign.id}`)
    this.context.modal.close()
  }

}

export default Voice
