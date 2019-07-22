import { CompactUserToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    configuration: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { configuration } = this.context
    return {
      title: 'New User',
      method: 'post',
      action: '/api/admin/team/users',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
            { label: 'Email', name: 'email', type: 'textfield', required: true },
            { label: 'Secondary Email', name: 'secondary_email', type: 'textfield' },
            { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', action: '/api/admin/assets/upload', endpoint: '/api/admin/assets', multiple: false },
            { label: 'Roles', name: 'role_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/roles', value: 'id', text: 'title' },
            { label: 'Groups', name: 'group_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/groups', value: 'id', text: 'title' },
            { label: 'Supervisors', name: 'supervisor_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/supervisors', value: 'user_id', text: 'full_name', format: CompactUserToken }
          ]
        },
        ...configuration.appUserFields.reduce((values, appUserFields) => [
          ...values,
          ...appUserFields
        ], [])
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.push(`/admin/team/users/${result.id}`)
    this.context.modal.close()
  }

}

export default New
