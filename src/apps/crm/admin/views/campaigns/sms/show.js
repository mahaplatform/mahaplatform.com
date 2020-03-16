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

  const { direction, status } = campaign

  const items = []

  if(direction === 'outbound' && status === 'draft') {
    items.push({ label: 'Send Campaign', modal: <Send campaign={ campaign } /> })
  } else if(direction === 'inbound' && status === 'active') {
    items.push({
      label: 'Deactivate Campaign',
      request: {
        endpoint: `/api/admin/crm/campaigns/sms/${campaign.id}/activate`,
        method: 'PATCH',
        confirm: 'Are you sure you want to deactivate this campaign?',
        body: {
          status: 'inactive'
        }
      }
    })
  } else if(direction === 'inbound') {
    items.push({
      label: 'Activate Campaign',
      request: {
        endpoint: `/api/admin/crm/campaigns/sms/${campaign.id}/activate`,
        method: 'PATCH',
        body: {
          status: 'active'
        }
      }
    })
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
