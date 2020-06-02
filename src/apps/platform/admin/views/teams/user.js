import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class User extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    team_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { team_id } = this.props
    return {
      title: 'New User',
      method: 'post',
      action: `/api/admin/platform/teams/${team_id}/users`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'Enter first name', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Enter last name', required: true },
            { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Enter email', required: true },
            { label: 'Roles', name: 'role_ids', type: 'lookup2', placeholder: 'Assign roles', multiple: true, endpoint: `/api/admin/platform/teams/${team_id}/roles`, value: 'id', text: 'title' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default User
