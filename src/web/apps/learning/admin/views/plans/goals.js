import React from 'react'
import PropTypes from 'prop-types'
import { Assignment } from 'maha-admin'
import CompetencyToken from '../../tokens/competency_token'

class PlanGoals extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    plan: PropTypes.object,
    goals: PropTypes.array
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { plan, goals } = this.props
    return {
      action: `/api/admin/learning/plans/${plan.id}/goals`,
      defaultValue: goals.map(goal => ({ goal })),
      assignedEndpoint: `/api/admin/learning/plans/${plan.id}/goals`,
      assignedFormat: (assignment) => <CompetencyToken {...assignment.competency} />,
      unassignedEndpoint: '/api/admin/learning/learning',
      unassignedFormat: CompetencyToken,
      name: 'competency',
      empty: {
        icon: 'star',
        title: 'No goals',
        text: 'You have not yet set any goals'
      },
      label: 'competency',
      text: 'title',
      title: 'Manage Goals',
      value: 'id'
    }
  }

}

export default PlanGoals
