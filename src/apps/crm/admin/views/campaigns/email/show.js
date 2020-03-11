import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Send from './send'

const getTabs = ({ audits, campaign, performance, workflows }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } audits={ audits } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } performance={ performance } /> }
  ]

  return { items }

}

const getTasks = ({ campaign }) =>  ({
  items: [
    { label: 'Send Campaign', modal: <Send campaign={ campaign } /> }
  ]
})

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
