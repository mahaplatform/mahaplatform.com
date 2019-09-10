import OptOutToken from '../../../tokens/optout'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
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

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { channel, contact, program } = this.props
    return {
      title: 'Opt Out',
      method: 'delete',
      action: `/api/admin/crm/contacts/${contact.id}/consent`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'channel_type', type: 'hidden', defaultValue: channel.type },
            { name: 'channel_id', type: 'hidden', defaultValue: channel.id },
            { name: 'program_id', type: 'hidden', defaultValue: program.id },
            { name: 'optout_reason', type: 'radiogroup', options: ['done','never','inappropriate','spam','other'], format: OptOutToken, defaultValue: 'done' }
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

export default OptOut
