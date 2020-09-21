import { Page } from 'maha-admin'
import Tickets from './tickets'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, event, registration, tickets }) => ({
  items: [
    { label: 'Details', component: <Details event={ event } registration={ registration } audits={ audits } /> },
    { label: 'Tickets', component: <Tickets event={ event } registration={ registration } tickets={ tickets } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = []

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/events_registrations/${props.params.id}/audits`,
  event: `/api/admin/events/events/${props.params.event_id}`,
  registration: `/api/admin/events/events/${props.params.event_id}/registrations/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Registration',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
