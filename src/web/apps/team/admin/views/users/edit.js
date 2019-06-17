import GroupToken from '../../components/group_token'
import { CompactUserToken, Form } from 'maha-admin'
import RoleToken from '../../components/role_token'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string,
    user: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { token, user } = this.props
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
            { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
            { label: 'Email', name: 'email', type: 'textfield', required: true },
            { label: 'Secondary Email', name: 'secondary_email', type: 'textfield' },
            { label: 'Notification Method', name: 'email_notifications_method', type: 'lookup', options: [{ value: 'none', text: 'None' }, { value: 'ondemand', text: 'On Demand' }, { value: 'digest', text: 'Daily Digest' }] },
            { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', action: '/api/admin/assets/upload', endpoint: '/api/admin/assets', token, multiple: false },
            { label: 'Roles', name: 'role_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/roles', value: 'id', text: 'title', format: RoleToken },
            { label: 'Groups', name: 'group_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/groups', value: 'id', text: 'title', format: GroupToken },
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(Edit)
