import { Audit, Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, topic }) => {

  const config = {}

  if(topic.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This topic was deleted' }
  }

  config.items = [
    { label: 'Title', content: topic.title },
    { label: 'Program', content: topic.program.title }
  ]

  if(topic.subscribe_workflow) {
    const subscribe = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/automation/workflows/${topic.subscribe_workflow.id}`
    }
    config.items.push({ label: 'Subscribe', content: <Button { ...subscribe } /> })
  }

  if(topic.unsubscribe_workflow) {
    const unsubscribe = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/automation/workflows/${topic.unsubscribe_workflow.id}`
    }
    config.items.push({ label: 'Unsubscribe', content: <Button { ...unsubscribe } /> })
  }

  config.items.push({ component: <Audit entries={ audits } /> })

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  topic: PropTypes.object
}

export default Details
