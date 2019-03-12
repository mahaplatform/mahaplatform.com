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
      action: `/api/admin/competencies/plans/${plan.id}/goals`,
      assignedEndpoint: `/api/admin/competencies/plans/${plan.id}/goals`,
      assignedFormat: CompetencyToken,
      defaultValue: goals.map(goal => goal.competency),
      empty: {
        icon: 'star',
        title: 'No goals',
        text: 'You have not yet set any goals'
      },
      label: 'competency',
      unassignedEndpoint: `/api/admin/competencies/plans/${plan.id}/goals/all`,
      unassignedFormat: CompetencyToken,
      text: 'title',
      title: 'Manage Goals',
      value: 'id'
    }
  }

}

export default PlanGoals
