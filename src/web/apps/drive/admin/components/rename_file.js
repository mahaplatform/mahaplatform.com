import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class RenameFile extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { item } = this.props
    return {
      title: 'Rename File',
      method: 'patch',
      endpoint: `/api/admin/drive/files/${item.code}`,
      action: `/api/admin/drive/files/${item.code}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'File Name', name: 'label', type: 'textfield', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}


export default RenameFile
