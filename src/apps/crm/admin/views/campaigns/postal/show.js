import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ campaign }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> }
  ]

  return { items }

}

const getTasks = ({ campaign }) => {

  const items = []

  items.push({
    label: 'Delete Campaign',
    confirm: `
      Are you sure you want to delete this campaign? You will also delete all of
      the associated workflows and performance data
    `,
    request: {
      endpoint: `/api/admin/crm/campaigns/email/${campaign.id}`,
      method: 'delete'
    }
  })

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/postal/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Postal Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)