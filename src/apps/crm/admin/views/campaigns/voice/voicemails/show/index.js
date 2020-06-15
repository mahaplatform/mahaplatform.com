import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, voicemail }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } voicemail={ voicemail } /> }
  ]
})

const getTasks = ({ workflow, list }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_workflow_recordings/${props.params.id}/audits`,
  voicemail: `/api/admin/crm/campaigns/voice/${props.params.campaign_id}/voicemails/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voicemail',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
