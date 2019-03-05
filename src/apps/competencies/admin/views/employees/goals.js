import React from 'react'
import PropTypes from 'prop-types'
import { Assignment } from 'maha-admin'
import CompetencyToken from '../../components/competency_token'

class EmployeePlanGoals extends React.Component {

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
      action: `/api/admin/competencies/employees/${plan.employee_id}/plans/${plan.id}/goals`,
      defaultValue: goals.map(goal => goal.competency.id),
      endpoint: `/api/admin/competencies/employees/${plan.employee_id}/plans/${plan.id}/goals/all`,
      filters: [
        { label: 'Category', name: 'category_id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/categories', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Classification', name: 'competencies_expectations.classification_id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/classifications', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Level', name: 'level', type: 'select', options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
      ],
      format: CompetencyToken,
      text: 'title',
      title: 'Manage Goals',
      value: 'id'
    }
  }

}

export default EmployeePlanGoals
