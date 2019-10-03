import React from 'react'
import PropTypes from 'prop-types'
import { Assignment } from 'maha-admin'
import CompetencyToken from '../../tokens/competency'

class Expectations extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    classification: PropTypes.object,
    expectations: PropTypes.array
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { classification, expectations } = this.props
    return {
      action: `/api/admin/learning/classifications/${classification.id}/expectations`,
      defaultValue: expectations.map(competency => ({ competency })),
      assignedEndpoint: `/api/admin/learning/classifications/${classification.id}/expectations`,
      assignedFormat: (assignment) => <CompetencyToken {...assignment.competency} />,
      unassignedEndpoint: '/api/admin/learning/competencies',
      unassignedFormat: CompetencyToken,
      name: 'competency',
      empty: {
        icon: 'trophy',
        title: 'Add Competencies',
        text: 'Please assign competencies to this classification'
      },
      label: 'Competency',
      text: 'title',
      title: 'Manage Expectations',
      value: 'id'
    }
  }

}

export default Expectations
