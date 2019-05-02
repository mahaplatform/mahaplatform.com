import CompactMemberTypeToken from '../../tokens/member_type_token/compact'
import { Assignment, CompactUserToken } from 'maha-admin'
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
      action: `/api/admin/expenses/projects/${project_id}/memberships`,
      assignedEndpoint: `/api/admin/expenses/projects/${project_id}/memberships`,
      assignedFormat: (membership) => <CompactUserToken { ...membership.user } />,
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
      typesName: 'member_type_id',
      typesOptions: [
        { value: 3, text: 'member' },
        { value: 2, text: 'approver' },
        { value: 1, text: 'owner' }
      ],
      unassignedEndpoint: '/api/admin/users',
      unassignedFormat: (user) => <CompactUserToken { ...user } />,
      value: 'id'
    }
  }

}

export default Users
