import Workflows from './workflows'
import { Page } from 'maha-admin'
import Details from './details'
import Results from './results'
import React from 'react'

const getTabs = ({ campaign, performance, workflows }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> },
    { label: 'Workflows', component: <Workflows workflows={ workflows } /> },
    { label: 'Performance', component: <Details campaign={ campaign } /> }
  ]

  if(campaign.sent_at !== null) {
    items.push({ label: 'Performance', component: <Results campaign={ campaign }  performance={ performance } /> })
  }

  return { items }

}

const getTasks = ({ list }) => []

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/email/${props.params.id}`,
  performance: `/api/admin/crm/campaigns/email/${props.params.id}/performance`,
  workflows: `/api/admin/crm/campaigns/email/${props.params.id}/workflows`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
