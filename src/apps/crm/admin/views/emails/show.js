import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Edit from './edit'
import React from 'react'

const getTabs = ({ audits, email }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } email={ email } /> },
    { label: 'Performance', component: <Performance email={ email } /> }
  ]
})

const getTasks = ({ email }) => ({
  items: [
    { label: 'Edit Email', modal: <Edit email={ email } /> },
    { label: 'Design Email', route: `/admin/crm/emails/${email.id}/design` },
    {
      label: 'Delete Email',
      confirm: `
        Are you sure you want to delete this email? You will also delete all of
        the associated performance data
      `,
      request: {
        endpoint: `/api/admin/crm/emails/${email.id}`,
        method: 'delete'
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_emails/${props.params.id}/audits`,
  email: `/api/admin/crm/emails/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
