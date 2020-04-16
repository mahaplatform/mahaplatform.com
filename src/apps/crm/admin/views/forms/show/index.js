import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, form, workflows }) => ({
  items: [
    { label: 'Details', component: <Details form={ form } audits={ audits } /> },
    { label: 'Performance', component: <Performance form={ form } /> }
  ]
})

const getTasks = ({ form }) => {
  const items = []
  if(!form.deleted_at) {
    items.push({ label: 'Edit Form', modal: <Edit form={ form } /> })
    items.push({
      label: 'Delete Form',
      confirm: `
        Are you sure you want to delete this form? You will also delete all of
        the associated workflows, emails, and performance data
      `,
      request: {
        endpoint: `/api/admin/crm/forms/${form.id}`,
        method: 'delete'
      }
    })
  }
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_forms/${props.params.id}/audits`,
  form: `/api/admin/crm/forms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
