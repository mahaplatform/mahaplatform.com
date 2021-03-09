import CompactProjectToken from '@apps/finance/admin/tokens/project/compact'
import { Audit, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Details = ({ audits, project, integration }) => {

  const list = {
    sections: [
      {
        title: 'Project Details',
        items: [
          { label: 'Title', content: project.title },
          { label: 'Type', content: project.type.toUpperCase() },
          { label: 'Tax Account', content: { project: project.tax_project }, format: CompactProjectToken }
        ]
      }
    ]
  }

  if(!project.is_active) {
    list.alert = { color: 'red', message: 'This project is disabled' }
  }

  if(_.includes(['accpac','accumatica'], integration)) {
    list.sections.push({
      title: integration === 'accpac' ? 'ACCPAC Details' : 'Accumatica Details',
      items: [
        { label: 'County Project Code', content: project.integration.project_code },
        { label: 'Main Project Code', content: project.integration.main_project_code },
        { label: 'Program Code', content: project.integration.program_code },
        { label: 'Source Code', content: project.integration.source_code },
        { label: 'Match', content: project.integration.match }
      ]
    })
  }

  list.sections.push({
    items: [
      { component: <Audit entries={ audits } /> }
    ]
  })

  list.footer = <Comments entity={`finance_projects/${project.id}`} active={ project.is_active } />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  integration: PropTypes.string,
  project: PropTypes.object
}

export default Details
