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
    { label: 'Title', content: workflow.title },
    { label: 'Program', content: workflow.program.title }
  ]

  if(workflow.trigger_type === 'list' && workflow.action === 'add') {
    list.items.push({ label: 'Trigger', content: 'Added to list' })
  } else if(workflow.trigger_type === 'list' && workflow.action === 'remove') {
    list.items.push({ label: 'Trigger', content: 'Removed from list' })
  } else if(workflow.trigger_type === 'topic' && workflow.action === 'add') {
    list.items.push({ label: 'Trigger', content: 'Added to topic' })
  } else if(workflow.trigger_type === 'topic' && workflow.action === 'remove') {
    list.items.push({ label: 'Trigger', content: 'Removed from topic' })
  } else if(workflow.trigger_type === 'open') {
    list.items.push({ label: 'Trigger', content: 'Email is opened' })
  } else if(workflow.trigger_type === 'click') {
    list.items.push({ label: 'Trigger', content: 'Email link is clicked' })
  } else if(workflow.trigger_type === 'response') {
    list.items.push({ label: 'Trigger', content: 'Form is submitted' })
  } else if(workflow.trigger_type === 'event') {
    list.items.push({ label: 'Trigger', content: 'Contact registers for event' })
  } else if(workflow.trigger_type === 'manual') {
    list.items.push({ label: 'Trigger', content: 'Contact is enrolled' })
  }

  if(workflow.trigger_type === 'list') {
    list.items.push({ label: 'List', content: workflow.list.title })
  } else if(workflow.trigger_type === 'topic') {
    list.items.push({ label: 'Topic', content: workflow.topic.title })
  } else if(workflow.trigger_type === 'response') {
    list.items.push({ label: 'Form', content: workflow.form.title })
  } else if(workflow.trigger_type === 'open') {
    list.items.push({ label: 'Email', content: workflow.email.title })
  } else if(workflow.trigger_type === 'click') {
    list.items.push({ label: 'Email', content: workflow.email.title })
  } else if(workflow.trigger_type === 'event') {
    list.items.push({ label: 'Event', content: workflow.event.title })
  }

  list.items.push({ label: 'Content', content: <Button { ...design } /> })

  list.items.push({ component: <Audit entries={ audits } /> })

  list.footer = <Comments entity={`crm_workflows/${workflow.id}`} active={ workflow.deleted_at === null } />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  workflow: PropTypes.object
}

export default Details
