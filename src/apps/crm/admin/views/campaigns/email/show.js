import { Page } from 'maha-admin'
import Details from './details'
import Results from './results'
import React from 'react'

const getTabs = ({ campaign }) => {

  const results = {
    sent: 1256,
    delivered: 1243,
    bounced: 13,
    opened: 900,
    desktop: 226,
    mobile: 674,
    complained: 0,
    clicked: 13,
    unsubscribed: 10
  }

  const items = [
    { label: 'Details', component: <Details campaign={ campaign } /> },
    { label: 'Results', component: <Results campaign={ campaign } results={ results } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => [
]

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/email/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Campaign',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
