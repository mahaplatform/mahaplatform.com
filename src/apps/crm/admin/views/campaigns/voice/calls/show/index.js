import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ enrollment }) => ({
  items: [
    { label: 'Details', component: <Details enrollment={ enrollment } /> }
  ]
})

const getTasks = ({ list }) => ({})

const mapResourcesToPage = (props, context) => ({
  enrollment: `/api/admin/crm/campaigns/voice/${props.params.campaign_id}/enrollments/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Call',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
