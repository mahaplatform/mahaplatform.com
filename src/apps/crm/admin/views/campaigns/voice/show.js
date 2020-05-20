import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Emails from './emails'
import Resend from './resend'
import React from 'react'
import Send from './send'
import Edit from './edit'

const getTabs = ({ audits, campaign, emails }) => ({
  items: [
    { label: 'Details', component: <Details campaign={ campaign } audits={ audits } /> },
    { label: 'Emails', component: <Emails emails={ emails } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } /> }
  ]
})

const getTasks = ({ campaign }) => {

  const { direction, status } = campaign

  const items = []

  if(status === 'draft') {
    items.push({ label: 'Edit Campaign', modal: <Edit campaign={ campaign } /> })
  }

  if(direction === 'outbound' && campaign.status === 'sent') {
    items.push({ label: 'Resend Campaign', modal: <Resend campaign={ campaign } /> })
  }

  if(direction === 'outbound' && status === 'draft') {
    items.push({ label: 'Send/Schedule Campaign', modal: <Send campaign={ campaign } /> })
  } else if(direction === 'inbound' && status === 'active') {
    items.push({
      label: 'Deactivate Campaign',
      request: {
        endpoint: `/api/admin/crm/campaigns/voice/${campaign.id}/activate`,
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
        endpoint: `/api/admin/crm/campaigns/voice/${campaign.id}/activate`,
        method: 'PATCH',
        confirm: 'Are you sure you want to activate this campaign?',
        body: {
          status: 'active'
        }
      }
    })
  }

  items.push({
    label: 'Delete Campaign',
    confirm: `
      Are you sure you want to delete this campaign? You will also delete all of
      the associated workflows and performance data
    `,
    request: {
      endpoint: `/api/admin/crm/campaigns/voice/${campaign.id}`,
      method: 'delete'
    }
  })

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_voice_campaigns/${props.params.id}/audits`,
  emails: `/api/admin/crm/campaigns/voice/${props.params.id}/emails`,
  campaign: `/api/admin/crm/campaigns/voice/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
