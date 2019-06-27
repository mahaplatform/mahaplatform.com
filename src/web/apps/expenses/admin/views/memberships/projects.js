import CompactMemberTypeToken from '../../tokens/member_type_token/compact'
import CompactProjectToken from '../../tokens/project_token/compact'
import { Assignment } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Projects extends React.Component {

  static propTypes = {
    user_id: PropTypes.number
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { user_id } = this.props
    return {
      action: `/api/admin/expenses/users/${user_id}/memberships`,
      assignedEndpoint: `/api/admin/expenses/users/${user_id}/memberships`,
      assignedFormat: (membership) => <CompactProjectToken { ...membership } />,
      empty: {
        icon: 'folder',
        title: 'Add projects',
        text: 'Please assign projects to this user'
      },
      label: 'Project',
      name: 'project',
      text: 'title',
      search: ['integration.project_code','title'],
      title: 'Manage Projects',
      typesFormat: (membership) => <CompactMemberTypeToken { ...membership } />,
      typesName: 'member_type_id',
      typesOptions: [
        { value: 3, text: 'member' },
        { value: 2, text: 'approver' },
        { value: 1, text: 'owner' }
      ],
      unassignedEndpoint: '/api/admin/expenses/projects',
      unassignedFormat: (project) => <CompactProjectToken project={ project } />,
      value: 'id'
    }
  }

}

export default Projects
