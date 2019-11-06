import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ list }) => ({
  items: [
    { label: 'Details', component: <Details list={ list } /> }
  ]
})

const getTasks = ({ form }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  list: `/api/admin/crm/lists/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'List',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
