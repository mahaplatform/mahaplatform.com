import { Form, CompactUserToken } from 'maha-admin'
import RoleToken from '../../components/role_token'
import GroupToken from '../../components/group_token'
import PropTypes from 'prop-types'
import React from 'react'

class UserImportFinalize extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    platform: PropTypes.object
  }

  static propTypes = {
    import: PropTypes.object,
    status: PropTypes.string,
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    const imp = this.props.import
    return (
      <div className="user-import-finalize">
        { imp &&
          <Form { ...this._getForm() } />
        }
      </div>
    )
  }

  componentDidMount() {

  }

  _getForm() {
    return {
      title: 'Finalize User Import',
      instructions: 'Set some additional information about each of the users you just imported',
      method: 'patch',
      action: `/api/admin/team/users/import/${this.props.import.id}/finalize`,
      cancelText: null,
      saveText: 'Next',
      onSuccess: this._handleDone,
      sections: [
        {
          fields: [
            { label: 'Roles', name: 'role_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/roles', value: 'id', text: 'title', format: RoleToken },
            { label: 'Groups', name: 'group_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/groups', value: 'id', text: 'title', format: GroupToken },
            { label: 'Supervisors', name: 'supervisor_ids', type: 'lookup2', multiple: true, endpoint: '/api/admin/team/supervisors', value: 'user_id', text: 'full_name', format: CompactUserToken }
          ]
        }
      ]
    }
  }

  _handleDone() {
    const { onDone } = this.props
    onDone(this.props.import)
  }

}

export default UserImportFinalize
