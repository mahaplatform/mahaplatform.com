import ResourceToken from '../../tokens/resource_token'
import { Assignment } from 'maha-admin'
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
      action: `/api/admin/competencies/competencies/${competency.id}/resources`,
      assignedFormat: ResourceToken,
      defaultValue: resources,
      endpoint: `/api/admin/competencies/competencies/${competency.id}/resources/all`,
      label: 'Resource',
      text: 'title',
      title: 'Manage Resources',
      unassignedFormat: ResourceToken,
      value: 'id'
    }
  }

}

export default Resources
