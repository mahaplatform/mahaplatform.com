import React from 'react'
import PropTypes from 'prop-types'
import { Assignment } from 'maha-admin'
import ResourceToken from '../../components/resource_token'

class EmployeePlanGoals extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    commitments: PropTypes.array,
    plan: PropTypes.object
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { plan, commitments } = this.props
    return {
      action: `/api/admin/competencies/employees/${plan.employee_id}/plans/${plan.id}/commitments`,
      defaultValue: commitments.map(commitment => commitment.resource.id),
      endpoint: `/api/admin/competencies/employees/${plan.employee_id}/plans/${plan.id}/commitments/all`,
      filters: [
        { label: 'Competency', name: 'competencies_competencies.id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/competencies', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Goals', name: 'competencies_competencies.id', type: 'select', multiple: true, endpoint: `/api/admin/competencies/employees/${plan.employee_id}/plans/${plan.id}/goals`, value: 'id', text: 'competency.title' }
      ],
      format: ResourceToken,
      text: 'title',
      title: 'Manage Commitments',
      value: 'id'
    }
  }

}

export default EmployeePlanGoals
