import MemberTypeToken from '../../components/member_type_token'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class ProjectMemberEdit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    member: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { member } = this.props
    return {
      title: 'Edit Member',
      method: 'patch',
      endpoint: `/api/admin/expenses/projects/${member.project_id}/members/${member.id}/edit`,
      action: `/api/admin/expenses/projects/${member.project_id}/members/${member.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'User', name: 'user.full_name', type: 'text' },
            { label: 'Type', name: 'member_type_id', type: 'lookup', prompt: 'Find a Type', endpoint: '/api/admin/expenses/member_types', value: 'id', text: 'full_name', format: MemberTypeToken },
            { label: 'Is Active', name: 'is_active', type: 'checkbox', defaultValue: true }
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

export default ProjectMemberEdit
