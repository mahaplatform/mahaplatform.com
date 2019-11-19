import CompactMemberTypeToken from '../../tokens/member_type/compact'
import { Assignment, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Users extends React.Component {

  static propTypes = {
    project_id: PropTypes.number
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { project_id } = this.props
    return {
      action: `/api/admin/finance/projects/${project_id}/memberships`,
      assignedEndpoint: `/api/admin/finance/projects/${project_id}/memberships`,
      assignedFormat: (membership) => <UserToken { ...membership.user } />,
      empty: {
        icon: 'user',
        title: 'Add Users',
        text: 'Please assign users to this project'
      },
      label: 'User',
      name: 'user',
      text: 'full_name',
      title: 'Manage Users',
      typesFormat: (membership) => <CompactMemberTypeToken { ...membership } />,
      typesName: 'type',
      typesOptions: [
        { value: 'member', text: 'member' },
        { value: 'approver', text: 'approver' },
        { value: 'owner', text: 'owner' }
      ],
      unassignedEndpoint: '/api/admin/users',
      unassignedFormat: (user) => <UserToken { ...user } />,
      value: 'id'
    }
  }

}

export default Users
