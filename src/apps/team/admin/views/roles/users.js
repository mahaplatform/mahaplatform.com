import { Assignment, CompactUserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Users extends React.Component {

  static propTypes = {
    role_id: PropTypes.number
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { role_id } = this.props
    return {
      action: `/api/admin/team/roles/${role_id}/users`,
      assignedEndpoint: `/api/admin/team/roles/${role_id}/users`,
      assignedFormat: ({ user }) => <CompactUserToken { ...user } presence={ false } />,
      empty: {
        icon: 'users',
        title: 'Add users',
        text: 'Please add users to this role'
      },
      label: 'User',
      name: 'user',
      text: 'full_name',
      title: 'Manage Users',
      unassignedEndpoint: '/api/admin/users',
      unassignedFormat: (user) => <CompactUserToken { ...user } presence={ false } />,
      value: 'id'
    }
  }

}

export default Users
