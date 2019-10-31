import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ email, workflow }) => ({
  items: [
    { label: 'Details', component: <Details workflow={ workflow } email={ email } /> },
    { label: 'Performance', component: <Performance email={ email } /> }
  ]
})

const getTasks = () => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  email: `/api/admin/crm/workflows/${props.params.workflow_id}/emails/${props.params.id}`,
  workflow: `/api/admin/crm/workflows/${props.params.workflow_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
