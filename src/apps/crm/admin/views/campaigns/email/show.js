import { Page } from 'maha-admin'
import Details from './details'
import Results from './results'
import React from 'react'

const getTabs = ({ campaign, results }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> }
  ]

  if(campaign.sent_at !== null) {
    items.push({ label: 'Results', component: <Results campaign={ campaign }  results={ results } /> })
  }

  return { items }

}

const getTasks = ({ list }) => []

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/email/${props.params.id}`,
  results: `/api/admin/crm/campaigns/email/${props.params.id}/results`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
