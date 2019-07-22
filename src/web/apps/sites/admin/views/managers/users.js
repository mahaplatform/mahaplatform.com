import { Assignment, UserToken } from 'maha-admin'
import RoleToken from '../../tokens/role_token'
import PropTypes from 'prop-types'
import React from 'react'

class Users extends React.Component {

  static propTypes = {
    site_id: PropTypes.string,
    role: PropTypes.object,
    users: PropTypes.array
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { site_id } = this.props
    return {
      action: `/api/admin/sites/sites/${site_id}/managers`,
      assignedEndpoint: `/api/admin/sites/sites/${site_id}/managers`,
      assignedFormat: (manager) => <UserToken { ...manager.user } presence={ false } />,
      empty: {
        icon: 'users',
        title: 'Add users',
        text: 'Please add users to this site'
      },
      label: 'User',
      name: 'user',
      text: 'full_name',
      title: 'Manage Users',
      typesFormat: RoleToken,
      typesName: 'role',
      typesOptions: [
        { value: 'contributor', text: 'contributor' },
        { value: 'administrator', text: 'administrator' }
      ],
      unassignedEndpoint: '/api/admin/users',
      unassignedFormat: (user) => <UserToken { ...user } presence={ false } />,
      value: 'id'
    }
  }

}

export default Users
