import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Send from './send'

const getTabs = ({ audits, campaign }) => ({
  items: [
    { label: 'Details', component: <Details campaign={ campaign } audits={ audits } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } performance={ performance } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = []
  if(campaign.status === 'draft') {
    items.push({ label: 'Send Campaign', modal: <Send campaign={ campaign } /> })
  }
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_sms_campaigns/${props.params.id}/audits`,
  campaign: `/api/admin/crm/campaigns/sms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'SMS Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
