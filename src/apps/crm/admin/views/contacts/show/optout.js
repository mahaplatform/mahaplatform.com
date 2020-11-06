import OptOutToken from '../../../tokens/optout'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class OptOut extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    program: PropTypes.object
  }

  state = {
    optout_reason: false
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)


  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { channel, contact, program } = this.props
    return {
      title: 'Opt Out',
      method: 'delete',
      action: `/api/admin/crm/contacts/${contact.id}/channels`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'channel_type', type: 'hidden', defaultValue: channel.type },
            { name: 'channel_id', type: 'hidden', defaultValue: channel.id },
            { name: 'program_id', type: 'hidden', defaultValue: program.id },
            { name: 'optout_reason', type: 'radiogroup', options: ['done','never','inappropriate','spam','other'], format: OptOutToken, defaultValue: 'done' },
            ...this._getOptOut()
          ]
        }
      ]
    }
  }

  _getOptOut() {
    if(this.state.optout_reason !== 'other') return []
    return [
      { name: 'optout_reason_other', type: 'textarea', placeholder: 'Tell us more' }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(name, value) {
    if(name === 'optout_reason') {
      this.setState({
        optout_reason: value
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default OptOut
