import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ list }) => {

  const config = {}

  config.items = [
    { label: 'Title', content: list.title },
    { label: 'Program', content: list.program.title }
  ]

  if(list.subscribe_workflow) {
    const subscribe = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/crm/workflows/${list.subscribe_workflow.id}`
    }
    config.items.push({ label: 'Subscribe', content: <Button { ...subscribe } /> })
  }

  if(list.unsubscribe_workflow) {
    const unsubscribe = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/crm/workflows/${list.unsubscribe_workflow.id}`
    }
    config.items.push({ label: 'Unsubscribe', content: <Button { ...unsubscribe } /> })
  }

  return <List { ...config } />

}

Details.propTypes = {
  list: PropTypes.object
}

export default Details
