import Performance from './performance'
import Workflows from './workflows'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ form, workflows }) => ({
  items: [
    { label: 'Details', component: <Details form={ form } /> },
    { label: 'Workflows', component: <Workflows form={ form } workflows={ workflows } /> },
    { label: 'Performance', component: <Performance form={ form } /> }
  ]
})

const getTasks = ({ form, list }) => {}

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/crm/forms/${props.params.id}`,
  workflows: `/api/admin/crm/forms/${props.params.id}/workflows`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
