import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Enroll from './enroll'
import Emails from './emails'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, emails, performance, workflow }) => ({
  items: [
    { label: 'Details', component: <Details workflow={ workflow } audits={ audits } /> },
    { label: 'Emails', component: <Emails emails={ emails } /> },
    { label: 'Performance', component: <Performance workflow={ workflow } /> }
  ]
})

const getTasks = ({ workflow, list }) => {
  const items = []
  if(!workflow.deleted_at) {
    items.push({ label: 'Edit Workflow', modal: <Edit workflow={ workflow } /> })
    items.push({ label: 'Enroll Contacts', modal: <Enroll workflow={ workflow } /> })
    items.push({
      label: 'Activate Workflow',
      show: workflow.status !== 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/automation/workflows/${workflow.id}/activate`,
        body: { is_active: true },
        success: () => {},
        failure: () => {}
      }
    })
    items.push({
      label: 'Dectivate Workflow',
      show: workflow.status === 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/automation/workflows/${workflow.id}/activate`,
        body: { is_active: false },
        success: () => {},
        failure: () => {}
      }
    })
    items.push({
      label: 'Delete Workflow',
      confirm: `
        Are you sure you want to delete this form? You will also delete all of
        the associated emails, and performance data
      `,
      request: {
        endpoint: `/api/admin/automation/workflows/${workflow.id}`,
        method: 'delete'
      }
    })
  }
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_workflows/${props.params.id}/audits`,
  emails: `/api/admin/automation/workflows/${props.params.id}/emails`,
  workflow: `/api/admin/automation/workflows/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
