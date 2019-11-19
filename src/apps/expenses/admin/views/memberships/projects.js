import CompactMemberTypeToken from '../../tokens/member_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
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
      typesName: 'type',
      typesOptions: [
        { value: 'member' , text: 'member' },
        { value: 'approver', text: 'approver' },
        { value: 'owner', text: 'owner' }
      ],
      unassignedEndpoint: '/api/admin/expenses/projects',
      unassignedFormat: (project) => <CompactProjectToken project={ project } />,
      value: 'id'
    }
  }

}

export default Projects
