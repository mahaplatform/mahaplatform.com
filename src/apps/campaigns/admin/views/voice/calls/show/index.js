import { Page } from '@admin'
import Details from './details'
import React from 'react'

const getTabs = ({ actions, campaign, enrollment }) => ({
  items: [
    { label: 'Details', component: <Details actions={ actions } campaign={ campaign } enrollment={ enrollment } /> }
  ]
})

const getTasks = ({ list }) => ({})

const mapResourcesToPage = (props, context) => ({
  actions: `/api/admin/campaigns/voice/${props.params.campaign_id}/calls/${props.params.id}/actions`,
  campaign: `/api/admin/campaigns/voice/${props.params.campaign_id}`,
  enrollment: `/api/admin/campaigns/voice/${props.params.campaign_id}/calls/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Call',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
