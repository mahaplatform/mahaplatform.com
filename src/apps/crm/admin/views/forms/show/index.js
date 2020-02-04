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

const getTasks = ({ form }) => ({
  items: [
    { label: 'Edit Form', modal: <Edit form={ form } /> },
    { label: 'Create Workflow' },
    { label: 'View Public Form', link: `${process.env.WEB_HOST}/crm/forms/${form.code}` }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_forms/${props.params.id}/audits`,
  form: `/api/admin/crm/forms/${props.params.id}`,
  emails: `/api/admin/crm/forms/${props.params.id}/emails`,
  workflows: `/api/admin/crm/forms/${props.params.id}/workflows`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
