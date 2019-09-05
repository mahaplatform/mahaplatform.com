import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    list: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { list } = this.props
    return {
      title: 'Edit List',
      method: 'patch',
      endpoint: `/api/admin/crm/lists/${list.id}/edit`,
      action: `/api/admin/crm/lists/${list.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter a name', required: true },
            { label: 'Program', name: 'program_id', type: 'lookup', endpoint: '/api/admin/team/programs', value: 'id', text: 'title', required: true },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Enter a description', required: true }
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
