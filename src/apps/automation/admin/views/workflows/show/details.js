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
    label: workflow.deleted_at === null ? 'Design Workflow' : 'View Workflow',
    className: 'link',
    route: `/admin/automation/workflows/${workflow.id}/design`
  }

  list.items = [
    { label: 'Title', content: workflow.title },
    { label: 'Program', content: workflow.program.title }
  ]

  if(workflow.trigger_type === 'list') {
    list.items.push({ label: 'List', content: workflow.list.title })
  } else if(workflow.trigger_type === 'topic') {
    list.items.push({ label: 'Topic', content: workflow.topic.title })
  } else if(workflow.trigger_type === 'response') {
    list.items.push({ label: 'Form', content: workflow.form.title })
  } else if(workflow.trigger_type === 'delivery' && workflow.email) {
    list.items.push({ label: 'Email', content: workflow.email.title })
  } else if(workflow.trigger_type === 'delivery' && workflow.email_campaign) {
    list.items.push({ label: 'Email', content: workflow.email_campaign.title })
  } else if(workflow.trigger_type === 'open' && workflow.email) {
    list.items.push({ label: 'Email', content: workflow.email.title })
  } else if(workflow.trigger_type === 'open' && workflow.email_campaign) {
    list.items.push({ label: 'Email', content: workflow.email_campaign.title })
  } else if(workflow.trigger_type === 'click' && workflow.email) {
    list.items.push({ label: 'Email', content: workflow.email.title })
  } else if(workflow.trigger_type === 'click' && workflow.email_campaign) {
    list.items.push({ label: 'Email', content: workflow.email_campaign.title })
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
