import { UserToken, Form } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { user } = this.props
    const { configuration } = this.context
    return {
      title: 'Edit User',
      method: 'patch',
      endpoint: `/api/admin/team/users/${user.id}/edit`,
      action: `/api/admin/team/users/${user.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Notification Method', name: 'email_notifications_method', type: 'lookup', placeholder: 'Choose a notification method', options: [{ value: 'none', text: 'None' }, { value: 'ondemand', text: 'On Demand' }, { value: 'digest', text: 'Daily Digest' }], value: 'value', text: 'text' },
            { label: 'Roles', name: 'role_ids', type: 'lookup2', placeholder: 'Assign roles', multiple: true, endpoint: '/api/admin/team/roles', value: 'id', text: 'title' },
            { label: 'Groups', name: 'group_ids', type: 'lookup2', placeholder: 'Assign groups', multiple: true, endpoint: '/api/admin/team/groups', value: 'id', text: 'title' },
            { label: 'Supervisors', name: 'supervisor_ids', type: 'lookup2', placeholder: 'Assign groups', multiple: true, endpoint: '/api/admin/team/supervisors', value: 'user_id', text: 'full_name', format: UserToken }
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
