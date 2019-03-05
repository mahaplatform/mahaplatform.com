import React from 'react'
import PropTypes from 'prop-types'
import { Assignment } from 'maha-admin'
import CompetencyToken from '../../components/competency_token'

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
      action: `/api/admin/competencies/classifications/${classification.id}/expectations`,
      defaultValue: expectations,
      endpoint: `/api/admin/competencies/classifications/${classification.id}/expectations/all`,
      filters: [
        { label: 'Category', name: 'category_id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/categories', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Level', name: 'level', type: 'select', options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
      ],
      empty: {
        icon: 'trophy',
        title: 'Add Competencies',
        text: 'Please assign competencies to this classification'
      },
      assignedFormat: CompetencyToken,
      label: 'Competency',
      text: 'title',
      title: 'Manage Expectations',
      value: 'id'
    }
  }

}

export default Expectations
