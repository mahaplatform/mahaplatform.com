import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ campaign, enrollment }) => ({
  items: [
    { label: 'Details', component: <Details campaign={ campaign } enrollment={ enrollment } /> }
  ]
})

const getTasks = ({ list }) => ({})

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/sms/${props.params.campaign_id}`,
  enrollment: `/api/admin/crm/campaigns/voice/${props.params.campaign_id}/calls/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Call',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)