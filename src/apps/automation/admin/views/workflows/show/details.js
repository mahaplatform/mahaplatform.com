import { Audit, Button, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const triggers = {
  email_received: { icon: 'envelope', text: 'Contact receives email' },
  email_opened: { icon: 'envelope-open', text: 'Contact opens email' },
  email_clicked: { icon: 'envelope-open', text: 'Contact clicks email' },
  enrollment_created: { icon: 'plus', text: 'Contact is enrolled in workflow' },
  interest_created: { icon: 'th-list', text: 'Contact is added to topic' },
  interest_deleted: { icon: 'th-list', text: 'Contact is removed from topic' },
  order_created: { icon: 'shopping-bag', text: 'Contact creates and order' },
  order_shipped: { icon: 'shopping-bag', text: 'Contact order is shipped' },
  property_updated: { icon: 'id-card', text: 'Contact property is updated' },
  response_created: { icon: 'check-square-o', text: 'Contact submits form' },
  registration_created: { icon: 'calendar', text: 'Contact registers for event' },
  subscription_created: { icon: 'th-list', text: 'Contact is added to list' },
  subscription_deleted: { icon: 'th-list', text: 'Contact is removed from list' }
}

const Details = ({ audits, workflow }) => {

  const items = [
    { label: 'Trigger', content: triggers[workflow.trigger_type].text },
    { label: 'Title', content: workflow.title },
    { label: 'Program', content: workflow.program.title }
  ]

  if(workflow.list) {
    const list = {
      label: workflow.list.title,
      className: 'link',
      route: `/crm/programs/${workflow.program.id}/lists/${workflow.list.id}`
    }
    items.push({ label: 'List', content: <Button { ...list } /> })
  }

  if(workflow.topic) {
    const topic = {
      label: workflow.topic.title,
      className: 'link',
      route: `/crm/programs/${workflow.program.id}/topics/${workflow.topic.id}`
    }
    items.push({ label: 'Topic', content: <Button { ...topic } /> })
  }

  if(workflow.form) {
    const form = {
      label: workflow.form.title,
      className: 'link',
      route: `/forms/forms/${workflow.form.id}`
    }
    items.push({ label: 'Form', content: <Button { ...form } /> })
  }

  if(workflow.event) {
    const event = {
      label: workflow.event.title,
      className: 'link',
      route: `/events/events/${workflow.event.id}`
    }
    items.push({ label: 'Event', content: <Button { ...event } /> })
  }

  if(workflow.email) {
    const email = {
      label: workflow.email.title,
      className: 'link',
      route: `/automation/emails/${workflow.email.id}`
    }
    items.push({ label: 'Email', content: <Button { ...email } /> })
  }

  if(workflow.email_campaign) {
    const campaign = {
      label: workflow.email_campaign.title,
      className: 'link',
      route: `/campaigns/campaigns/email/${workflow.email_campaign.id}`
    }
    items.push({ label: 'Email Campaign', content: <Button { ...campaign } /> })
  }

  if(workflow.store) {
    const store = {
      label: workflow.store.title,
      className: 'link',
      route: `/stores/stores/${workflow.store.id}`
    }
    items.push({ label: 'Store', content: <Button { ...store } /> })
  }

  const design = {
    label: workflow.deleted_at === null ? 'Design Workflow' : 'View Workflow',
    className: 'link',
    route: `/admin/automation/workflows/${workflow.id}/design`
  }

  items.push({ label: 'Content', content: <Button { ...design } /> })

  items.push({ component: <Audit entries={ audits } /> })

  const config = {
    items,
    footer: <Comments entity={`crm_workflows/${workflow.id}`} active={ workflow.deleted_at === null } />
  }

  if(workflow.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This workflow was deleted' }
  } else if(workflow.status === 'draft') {
    config.alert = { color: 'grey', message: 'This workflow is in draft mode' }
  } else if(workflow.status === 'active') {
    config.alert = { color: 'green', message: 'This workflow is active' }
  } else if(workflow.status === 'inactive') {
    config.alert = { color: 'red', message: 'This workflow is inactive' }
  }

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  workflow: PropTypes.object
}

export default Details
