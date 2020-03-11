import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, campaign }) => ({
  items: [
    { label: 'Details', component: <Details campaign={ campaign } audits={ audits } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } performance={ performance } /> }
  ]
})

const getTasks = ({ list }) => {}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_voice_campaigns/${props.params.id}/audits`,
  campaign: `/api/admin/crm/campaigns/voice/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
