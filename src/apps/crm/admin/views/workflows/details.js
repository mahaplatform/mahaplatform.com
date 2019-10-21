import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ workflow }) => {

  const config = {}

  const design = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/workflows/${workflow.code}/design`
  }

  config.items = [
    { label: 'Title', content: workflow.title },
    { label: 'Program', content: workflow.program.title },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  workflow: PropTypes.object
}

export default Details
