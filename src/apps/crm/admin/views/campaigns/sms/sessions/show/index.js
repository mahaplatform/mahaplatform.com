import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ actions, campaign, session }) => ({
  items: [
    { label: 'Details', component: <Details actions={ actions } campaign={ campaign } session={ session } /> }
  ]
})

const getTasks = ({ list }) => ({})

const mapResourcesToPage = (props, context) => ({
  actions: `/api/admin/crm/campaigns/sms/${props.params.campaign_id}/sessions/${props.params.id}/actions`,
  campaign: `/api/admin/crm/campaigns/sms/${props.params.campaign_id}`,
  session: `/api/admin/crm/campaigns/sms/${props.params.campaign_id}/sessions/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Session',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)