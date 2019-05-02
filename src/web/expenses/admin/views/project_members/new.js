import MemberTypeToken from '../../components/member_type_token'
import { Form, CompactUserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class ProjectMemberNew extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    integration: PropTypes.string,
    project: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { project } = this.props
    return {
      title: 'Add Member',
      method: 'post',
      action: `/api/admin/expenses/projects/${project.id}/members`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'User', name: 'user_id', type: 'lookup', prompt: 'Find a User', endpoint: `/api/admin/expenses/projects/${project.id}/members/unassigned`, value: 'id', text: 'full_name', format: CompactUserToken },
            { label: 'Type', name: 'member_type_id', type: 'lookup', prompt: 'Find a Type', endpoint: '/api/admin/expenses/member_types', value: 'id', text: 'full_name', format: MemberTypeToken }
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

export default ProjectMemberNew
