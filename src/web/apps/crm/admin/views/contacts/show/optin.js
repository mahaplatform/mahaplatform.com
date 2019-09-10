import OptInToken from '../../../tokens/optin'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class OptIn extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    program: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { channel, contact, program } = this.props
    return {
      title: 'Opt In',
      method: 'post',
      action: `/api/admin/crm/contacts/${contact.id}/channels`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'channel_type', type: 'hidden', defaultValue: channel.type },
            { name: 'channel_id', type: 'hidden', defaultValue: channel.id },
            { name: 'program_id', type: 'hidden', defaultValue: program.id },
            { name: 'optin_reason', type: 'radiogroup', options: ['consent','contract','legal obligation','vital interests','public interest','legitimate interest'], format: OptInToken, defaultValue: 'consent' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default OptIn
