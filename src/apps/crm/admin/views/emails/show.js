import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = () => ({
  items: [
    { label: 'Details', component: <Details /> },
    { label: 'Performance', component: <Details /> }
  ]
})

const getTasks = () => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  workflow: '/api/admin/crm/workflows'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
