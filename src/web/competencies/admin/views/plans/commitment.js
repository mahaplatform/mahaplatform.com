import ResourceToken from '../../tokens/resource_token'
import { Assignment } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class PlanCommitment extends React.Component {

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
      action: `/api/admin/competencies/plans/${plan.id}/commitments`,
      assignedEndpoint: `/api/admin/competencies/plans/${plan.id}/commitments`,
      assignedFormat: ResourceToken,
      defaultValue: commitments.map(commitment => commitment.resource),
      empty: {
        icon: 'handshake-o',
        title: 'No commitments',
        text: 'You have not yet made any commitments'
      },
      label: 'resource',
      unassignedEndpoint: `/api/admin/competencies/plans/${plan.id}/commitments/all`,
      text: 'title',
      title: 'Manage Commitments',
      value: 'id'
    }
  }

}

export default PlanCommitment
