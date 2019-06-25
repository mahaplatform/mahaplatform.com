import React from 'react'
import PropTypes from 'prop-types'
import { Assignment } from 'maha-admin'
import CompetencyToken from '../../tokens/competency_token'

class Competencies extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    resource: PropTypes.object,
    competencies: PropTypes.array
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { resource, competencies } = this.props
    return {
      action: `/api/admin/competencies/resources/${resource.id}/competencies`,
      defaultValue: competencies.map(competency => ({ competency })),
      assignedEndpoint: `/api/admin/competencies/resources/${resource.id}/competencies`,
      assignedFormat: (assignment) => <CompetencyToken {...assignment.competency} />,
      unassignedEndpoint: '/api/admin/competencies/resources',
      unassignedFormat: CompetencyToken,
      name: 'competency',
      empty: {
        icon: 'trophy',
        title: 'Add Competencies',
        text: 'Please assign competencies to this resource'
      },
      label: 'Competency',
      text: 'title',
      title: 'Manage Competencies',
      value: 'id'
    }
  }

}

export default Competencies
