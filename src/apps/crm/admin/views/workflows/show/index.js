import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Emails from './emails'
import React from 'react'

const getTabs = ({ emails, performance, workflow }) => ({
  items: [
    { label: 'Details', component: <Details workflow={ workflow } /> },
    { label: 'Emails', component: <Emails workflow={ workflow } emails={ emails } /> },
    { label: 'Performance', component: <Performance workflow={ workflow } performance={ performance } /> }
  ]
})

const getTasks = ({ workflow, list }) => ({
  items: [
    { label: 'Create Email' },
    { label: 'Edit Workflow' },
    {
      label: 'Activate Workflow',
      show: workflow.status !== 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/workflows/${workflow.code}/activate`,
        body: { is_active: true },
        success: () => {},
        failure: () => {}
      }
    }, {
      label: 'Dectivate Workflow',
      show: workflow.status === 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/workflows/${workflow.code}/activate`,
        body: { is_active: false },
        success: () => {},
        failure: () => {}
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  emails: `/api/admin/crm/workflows/${props.params.id}/emails`,
  performance: `/api/admin/crm/workflows/${props.params.id}/performance`,
  workflow: `/api/admin/crm/workflows/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
