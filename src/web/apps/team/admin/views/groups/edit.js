import PropTypes from 'prop-types'
import { Form, UserToken } from 'maha-admin'
import React from 'react'

class GroupsEdit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    group: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { group } = this.props
    return {
      title: 'Edit Group',
      method: 'patch',
      endpoint: `/api/admin/team/groups/${group.id}/edit`,
      action: `/api/admin/team/groups/${group.id}`,
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default GroupsEdit
