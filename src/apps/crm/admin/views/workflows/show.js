import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ workflow }) => {

  const items = [
    { label: 'Details', component: <Details workflow={ workflow } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => [
]

const mapResourcesToPage = (props, context) => ({
  workflow: `/api/admin/crm/workflows/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
