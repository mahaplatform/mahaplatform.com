import Details from './details'
import { Page } from '@admin'
import React from 'react'

const getTabs = ({ call, connections }) => ({
  items: [
    { label: 'Details', component: <Details call={ call } connections={ connections } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  call: `/api/admin/team/calls/${props.params.id}`,
  connections: `/api/admin/team/calls/${props.params.id}/connections`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Call',
  tabs: getTabs(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
