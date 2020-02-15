import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ campaign }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> },
    { label: 'Performance', component: <Performance campaign={ campaign } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => {}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/sms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'SMS Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
