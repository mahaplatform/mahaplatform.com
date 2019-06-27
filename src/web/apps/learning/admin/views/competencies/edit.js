import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Competency',
      method: 'patch',
      endpoint: `/api/admin/learning/learning/${id}/edit`,
      action: `/api/admin/learning/learning/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textarea', required: true },
            { label: 'Category', name: 'category_id', type: 'lookup', required: true, endpoint: '/api/admin/learning/categories', value: 'id', text: 'title' },
            { label: 'Level', name: 'level', type: 'lookup', required: true, options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
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
