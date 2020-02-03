import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class NewFolder extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    parent_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { parent_id } = this.props
    return {
      title: 'New Folder',
      method: 'post',
      action: '/api/admin/drive/folders',
      saveText: 'Create',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Label', name: 'label', type: 'textfield', required: true },
            { name: 'parent_id', type: 'hidden', defaultValue: parent_id }
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


export default NewFolder
