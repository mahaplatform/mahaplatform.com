import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Enroll from './enroll'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, emails, performance, workflow }) => ({
  items: [
    { label: 'Details', component: <Details workflow={ workflow } audits={ audits } /> },
    { label: 'Performance', component: <Performance workflow={ workflow } /> }
  ]
})

const getTasks = ({ workflow, list }) => ({
  items: [
    { label: 'Edit Workflow', modal: <Edit workflow={ workflow } /> },
    { label: 'Enroll Contacts', modal: <Enroll workflow={ workflow } /> },
    {
      label: 'Activate Workflow',
      show: workflow.status !== 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/workflows/${workflow.id}/activate`,
        body: { is_active: true },
        success: () => {},
        failure: () => {}
      }
    }, {
      label: 'Dectivate Workflow',
      show: workflow.status === 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/workflows/${workflow.id}/activate`,
        body: { is_active: false },
        success: () => {},
        failure: () => {}
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_workflows/${props.params.id}/audits`,
  workflow: `/api/admin/crm/workflows/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
