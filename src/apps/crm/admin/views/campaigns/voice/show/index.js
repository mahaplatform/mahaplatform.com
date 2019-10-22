import { Page } from 'maha-admin'
import Details from './details'
import Results from './results'
import React from 'react'

const getTabs = ({ campaign }) => {

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> },
    { label: 'Results', component: <Results campaign={ campaign } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => [
]

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/voice/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
