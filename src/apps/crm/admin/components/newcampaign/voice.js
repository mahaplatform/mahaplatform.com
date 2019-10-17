import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Voice extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    direction: PropTypes.string,
    program_id: PropTypes.number,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { direction, program_id } = this.props
    const filter = { program_id: { $eq: program_id } }
    return {
      title: 'New Interactive Voice',
      method: 'post',
      action: '/api/admin/crm/campaigns/voice',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { name: 'direction', type: 'hidden', defaultValue: direction },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Phone Number', name: 'phone_number_id', type: 'lookup', placeholder: 'Choose a phone number', endpoint: '/api/admin/team/phone_numbers', filter, value: 'id', text: 'formatted', required: true }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(campaign) {
    this.props.onDone(campaign)
  }

}

export default Voice
