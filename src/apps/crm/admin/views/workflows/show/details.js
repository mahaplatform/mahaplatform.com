import { Audit, Button, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, workflow }) => {

  const list = {}

  if(workflow.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This workflow was deleted' }
  } else if(workflow.status === 'draft') {
    list.alert = { color: 'grey', message: 'This workflow is in draft mode' }
  } else if(workflow.status === 'active') {
    list.alert = { color: 'green', message: 'This workflow is active' }
  } else if(workflow.status === 'inactive') {
    list.alert = { color: 'red', message: 'This workflow is inactive' }
  }

  const design = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/workflows/${workflow.id}/design`
  }

  list.items = [
    { label: 'Title', content: workflow.display_name },
    { label: 'Program', content: workflow.program.title },
    { label: 'Content', content: <Button { ...design } /> },
    { component: <Audit entries={ audits } /> }
  ]

  list.footer = <Comments entity={`crm_workflows/${workflow.id}`} active={ workflow.deleted_at === null } />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  workflow: PropTypes.object
}

export default Details
