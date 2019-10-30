import { Audit, Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ workflow }) => {

  const list = {}

  if(workflow.status === 'draft') {
    list.alert = { color: 'grey', message: 'This workflow is in draft mode' }
  } else if(workflow.status === 'active') {
    list.alert = { color: 'green', message: 'This workflow is active' }
  } else if(workflow.status === 'inactive') {
    list.alert = { color: 'red', message: 'This workflow is inactive' }
  }

  const design = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/workflows/${workflow.code}/design`
  }

  list.items = [
    { label: 'Title', content: workflow.title },
    { label: 'Program', content: workflow.program.title },
    { label: 'Content', content: <Button { ...design } /> },
    { component: <Audit entries={ workflow.audit } /> }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  workflow: PropTypes.object
}

export default Details
