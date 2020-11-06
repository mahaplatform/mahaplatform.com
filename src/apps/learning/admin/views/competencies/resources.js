import ResourceToken from '../../tokens/resource'
import { Assignment } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Resources extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    competency: PropTypes.object,
    resources: PropTypes.array
  }

  render() {
    return <Assignment { ...this._getAssignment() } />
  }

  _getAssignment() {
    const { competency, resources } = this.props
    return {
      action: `/api/admin/learning/competencies/${competency.id}/resources`,
      defaultValue: resources.map(resource => ({ resource })),
      assignedEndpoint: `/api/admin/learning/competencies/${competency.id}/resources`,
      assignedFormat: (assignment) => <ResourceToken {...assignment.resource} />,
      unassignedEndpoint: '/api/admin/learning/resources',
      unassignedFormat: ResourceToken,
      name: 'resource',
      label: 'Resource',
      text: 'title',
      title: 'Manage Resources',
      value: 'id'
    }
  }

}

export default Resources
