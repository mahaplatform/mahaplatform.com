import Performance from './performance'
import { Page } from '@admin'
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

const getTasks = ({ campaign }, { flash }) => {

  const { status } = campaign

  const items = []

  if(status === 'draft') {
    items.push({ label: 'Edit Campaign', modal: <Edit campaign={ campaign } /> })
  }

  items.push({ label: 'Resend Campaign', modal: <Resend campaign={ campaign } /> })

  if(status === 'draft') {
    items.push({ label: 'Send/Schedule Campaign', modal: <Send campaign={ campaign } /> })
  } else if(status === 'scheduled') {
    items.push({
      label: 'Unschedule Campaign',
      confirm: 'Are you sure you want to unschedule this campaign?',
      request: {
        endpoint: `/api/admin/campaigns/email/${campaign.id}/unschedule`,
        method: 'patch',
        onFailure: () => flash.set('error', 'Unable to unschedule campaign')
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
      endpoint: `/api/admin/campaigns/voice/${campaign.id}`,
      method: 'delete'
    }
  })

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_voice_campaigns/${props.params.id}/audits`,
  emails: `/api/admin/campaigns/voice/${props.params.id}/emails`,
  campaign: `/api/admin/campaigns/voice/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
