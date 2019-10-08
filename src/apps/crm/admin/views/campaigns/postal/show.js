import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ campaign }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => [
]

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/postal/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Postal Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
