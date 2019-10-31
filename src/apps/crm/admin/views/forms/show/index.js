import Performance from './performance'
import Workflows from './workflows'
import { Page } from 'maha-admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, form, performance, workflows }) => ({
  items: [
    { label: 'Details', component: <Details form={ form } audits={ audits } /> },
    { label: 'Workflows', component: <Workflows form={ form } workflows={ workflows } /> },
    { label: 'Performance', component: <Performance form={ form } performance={ performance } /> }
  ]
})

const getTasks = ({ form }) => ({
  items: [
    { label: 'Edit Form', modal: <Edit form={ form } /> },
    { label: 'Create Workflow' },
    {
      label: 'Activate Form',
      show: form.status !== 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/forms/${form.id}/activate`,
        body: { is_active: true },
        success: () => {},
        failure: () => {}
      }
    }, {
      label: 'Dectivate Form',
      show: form.status === 'active',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/forms/${form.id}/activate`,
        body: { is_active: false },
        success: () => {},
        failure: () => {}
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_forms/${props.params.id}/audits`,
  form: `/api/admin/crm/forms/${props.params.id}`,
  performance: `/api/admin/crm/forms/${props.params.id}/performance`,
  workflows: `/api/admin/crm/forms/${props.params.id}/workflows`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
