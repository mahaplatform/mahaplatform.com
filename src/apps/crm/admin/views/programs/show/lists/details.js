import { Audit, Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, list }) => {

  const config = {}

  if(list.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This list was deleted' }
  }

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

  config.items.push({ component: <Audit entries={ audits } /> })

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  list: PropTypes.object
}

export default Details
