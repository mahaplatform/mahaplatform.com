import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Resend from './resend'
import React from 'react'
import Send from './send'
import Edit from './edit'

const getTabs = ({ audits, campaign, performance, workflows }) => ({
  items: [
    { label: 'Details', component: <Details campaign={ campaign } audits={ audits } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } performance={ performance } /> }
  ]
})

const getTasks = ({ campaign }) => {

  const items = []

  if(campaign.status === 'draft') {
    items.push({ label: 'Edit Campaign', modal: <Edit campaign={ campaign } /> })
    items.push({ label: 'Design Email', route: `/admin/crm/campaigns/email/${campaign.id}/design` }),
    items.push({ label: 'Schedule Campaign', modal: <Send campaign={ campaign } /> })
  }

  if(campaign.status === 'sent') {
    items.push({ label: 'Resend Campaign', modal: <Resend campaign={ campaign } /> })
  }

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
  audits: `/api/admin/crm_email_campaigns/${props.params.id}/audits`,
  campaign: `/api/admin/crm/campaigns/email/${props.params.id}`,
  performance: `/api/admin/crm/campaigns/email/${props.params.id}/performance`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
