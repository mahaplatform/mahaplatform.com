import React from 'react'
import PropTypes from 'prop-types'
import { Assignment } from 'maha-admin'
import CompetencyToken from '../../components/competency_token'

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
      defaultValue: competencies,
      endpoint: `/api/admin/competencies/resources/${resource.id}/competencies/all`,
      filters: [
        { label: 'Category', name: 'category_id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/categories', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Classification', name: 'classification_id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/classifications', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Level', name: 'level', type: 'select', options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
      ],
      empty: {
        icon: 'trophy',
        title: 'Add Competencies',
        text: 'Please assign competencies to this resource'
      },
      assignedFormat: CompetencyToken,
      label: 'Competency',
      text: 'title',
      title: 'Manage Competencies',
      unassignedFormat: CompetencyToken,
      value: 'id'
    }
  }

}

export default Competencies
