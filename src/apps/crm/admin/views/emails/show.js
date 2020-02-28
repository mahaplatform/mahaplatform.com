import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ email, performance }) => ({
  items: [
    { label: 'Details', component: <Details email={ email } /> },
    { label: 'Performance', component: <Performance email={ email } performance={ performance } /> }
  ]
})

const getTasks = () => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  email: `/api/admin/crm/emails/${props.params.id}`,
  performance: `/api/admin/crm/emails/${props.params.id}/performance`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
