import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import sections from './sections'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    fields: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { contact } = this.props
    return {
      title: 'Edit Contact',
      method: 'patch',
      endpoint: `/api/admin/crm/contacts/${contact.id}/edit`,
      action: `/api/admin/crm/contacts/${contact.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: this._getSections()
    }
  }

  _getSections() {
    const { fields } = this.props
    const results = sections(fields)
    results[0].fields = [
      { label: 'First Name', name: 'first_name', type: 'textfield' },
      { label: 'Last Name', name: 'last_name', type: 'textfield' },
      { label: 'Email', name: 'email', type: 'emailfield', required: true },
      { label: 'Phone', name: 'phone', type: 'phonefield' },
      { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', action: '/api/admin/assets/upload', endpoint: '/api/admin/assets', multiple: false },
      ...results[0].fields
    ]
    return results
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Edit
