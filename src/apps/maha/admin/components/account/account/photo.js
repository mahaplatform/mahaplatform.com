import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Photo extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
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
      title: 'Change Photo',
      method: 'patch',
      endpoint: '/api/admin/account',
      action: '/api/admin/account/photo',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Photo', name: 'photo_id', endpoint: '/api/admin/account/photo', type: 'filefield', prompt: 'Choose Photo', multiple: false }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleSuccess() {
    this.context.modal.pop()
  }

}

export default Photo
