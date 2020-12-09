import Performance from './performance'
import Workflows from './workflows'
import Convert from './convert'
import Details from './details'
import { Page } from '@admin'
import Resend from './resend'
import Clone from './clone'
import React from 'react'
import Send from './send'
import Edit from './edit'

const getTabs = ({ audits, campaign, performance, workflows }) => ({
  items: [
    { label: 'Details', component: <Details campaign={ campaign } audits={ audits } /> },
    { label: 'Automation', rights: ['automation:access_app'], component: <Workflows campaign={ campaign } workflows={ workflows } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } performance={ performance } /> }
  ]
})

const getTasks = ({ campaign }, { flash }) => {

  const items = []

  if(campaign.status === 'draft') {
    items.push({ label: 'Edit Campaign', modal: <Edit campaign={ campaign } /> })
    items.push({ label: 'Design Email', route: `/admin/campaigns/email/${campaign.id}/design` }),
    items.push({ label: 'Send/Schedule Campaign', modal: <Send campaign={ campaign } /> })
  } else if(campaign.status === 'scheduled') {
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

  items.push({ label: 'Convert to Template', modal: <Convert campaign={ campaign } /> })

  if(campaign.status === 'sent') {
    items.push({ label: 'Resend Campaign', modal: <Resend campaign={ campaign } /> })
  }

  items.push({ label: 'Clone Campaign', modal: <Clone campaign={ campaign } /> })

  items.push({
    label: 'Delete Campaign',
    confirm: `
      Are you sure you want to delete this campaign? You will also delete all of
      the associated workflows and performance data
    `,
    request: {
      endpoint: `/api/admin/campaigns/email/${campaign.id}`,
      method: 'delete'
    }
  })

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_email_campaigns/${props.params.id}/audits`,
  campaign: `/api/admin/campaigns/email/${props.params.id}`,
  performance: `/api/admin/campaigns/email/${props.params.id}/performance`,
  workflows: `/api/admin/campaigns/email/${props.params.id}/workflows`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaign',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
