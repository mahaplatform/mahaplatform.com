import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ topic }) => {

  const config = {}

  config.items = [
    { label: 'Title', content: topic.title },
    { label: 'Program', content: topic.program.title }
  ]

  if(topic.subscribe_workflow) {
    const subscribe = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/crm/workflows/${topic.subscribe_workflow.id}`
    }
    config.items.push({ label: 'Subscribe', content: <Button { ...subscribe } /> })
  }

  if(topic.unsubscribe_workflow) {
    const unsubscribe = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/crm/workflows/${topic.unsubscribe_workflow.id}`
    }
    config.items.push({ label: 'Unsubscribe', content: <Button { ...unsubscribe } /> })
  }

  return <List { ...config } />

}

Details.propTypes = {
  topic: PropTypes.object
}

export default Details
