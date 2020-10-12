import React from 'react'
import PropTypes from 'prop-types'
import { Form, UserToken } from 'maha-admin'

class GroupsNew extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Group',
      method: 'post',
      action: '/api/admin/team/groups',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Leader', name: 'leader_id', type: 'lookup', placeholder: 'Choose a leader', endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: UserToken, required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/team/groups/${result.id}`)
    this.context.modal.close()
  }

}

export default GroupsNew
