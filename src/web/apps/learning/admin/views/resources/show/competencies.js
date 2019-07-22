import CompetencyToken from '../../../tokens/competency'
import AssignCompetencies from '../competencies'
import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Competencies = ({ resource, competencies }) => {

  const list = {
    items: competencies.map(competency => ({
      content: competency,
      component: CompetencyToken
    })),
    empty: {
      icon: 'trophy',
      title: 'No Competencies',
      text: 'This resource is not assigned to any competencies',
      button: {
        label: 'Manage Competencies',
        modal: <AssignCompetencies resource={ resource } competencies={ competencies } />
      }
    }
  }

  return <List { ...list } />

}

Competencies.propTypes = {
  resource: PropTypes.object,
  competencies: PropTypes.array
}

export default Competencies
