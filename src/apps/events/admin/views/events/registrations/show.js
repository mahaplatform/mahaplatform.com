import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ registration }) => ({
  items: [
    { label: 'Details', component: <Details registration={ registration } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = []

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  registration: `/api/admin/events/events/${props.params.event_id}/registrations/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Session',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
