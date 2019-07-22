import { Assignment, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Employees extends React.Component {

  static propTypes = {
    supervisor_id: PropTypes.number
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { supervisor_id } = this.props
    return {
      action: `/api/admin/team/supervisors/${supervisor_id}/users`,
      assignedEndpoint: `/api/admin/team/supervisors/${supervisor_id}/users`,
      assignedFormat: ({ user }) => <UserToken { ...user } />,
      empty: {
        icon: 'users',
        title: 'Add users',
        text: 'Please assign users to this supervisor'
      },
      label: 'User',
      name: 'user',
      text: 'full_name',
      title: 'Manage Users',
      unassignedEndpoint: '/api/admin/users',
      unassignedFormat: (user) => <UserToken { ...user } />,
      value: 'id'
    }
  }

}

export default Employees
