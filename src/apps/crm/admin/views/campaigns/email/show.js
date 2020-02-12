import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ campaign, performance, workflows }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } performance={ performance } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => []

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/email/${props.params.id}`,
  performance: `/api/admin/crm/campaigns/email/${props.params.id}/performance`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
