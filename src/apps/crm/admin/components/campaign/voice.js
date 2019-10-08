import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Voice extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id } = this.props
    const filter = { program_id: { $eq: program_id } }
    return {
      title: 'New Interactive Voice',
      method: 'post',
      action: '/api/admin/crm/campaigns/voice',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'Phone Number', name: 'number_id', type: 'lookup', placeholder: 'Choose a phone number', endpoint: '/api/admin/crm/numbers', filter, value: 'id', text: 'number', required: true }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChangeField(key, value) {
    if(key === 'program_id') {
      this.setState({
        program_id: value
      })
    }
  }

  _handleSuccess() {
    this.props.onDone()
  }

}

export default Voice
