import PropTypes from 'prop-types'
import { CompactUserToken, Form } from 'maha-admin'
import React from 'react'

class Transfer extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Transfer Ownership',
      method: 'post',
      action: '/api/admin/drive/items/transfer',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      saveText: 'Transfer',
      sections: [
        {
          fields: [
            { label: 'From', name: 'from_user_id', type: 'lookup', required: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: CompactUserToken },
            { label: 'To', name: 'to_user_id', type: 'lookup', required: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: CompactUserToken },
            { label: 'Reassignment', name: 'strategy', type: 'radiogroup', required: true, options: this._getStrategy(), defaultValue: 'none' }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    return [
      {
        value: 'none',
        text: 'Do not reassign any access to previous owner'
      },{
        value: 'edit',
        text: <span>Reassign all items to previous owner with <strong>edit</strong> access</span>
      },{
        value: 'view',
        text: <span>Reassign all items to previous owner with <strong>view</strong> access</span>
      }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Transfer
