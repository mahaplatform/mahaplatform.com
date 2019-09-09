import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Edit Team',
      method: 'patch',
      endpoint: '/api/admin/team/settings',
      action: '/api/admin/team/settings',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title', required: true },
            { label: 'Team Name', name: 'subdomain', type: 'textfield', placeholder: 'Subdomain', required: true },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false }

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

export default Edit
