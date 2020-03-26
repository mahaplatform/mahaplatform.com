import Registrations from './registrations'
import Sessions from './sessions'
import Waitings from './waitings'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, event, registrations, sessions, waitings }) => ({
  items: [
    { label: 'Details', component: <Details event={ event } audits={ audits } /> },
    { label: 'Sessions', component: <Sessions event={ event } sessions={ sessions } /> },
    { label: 'Registrations', component: <Registrations event={ event } registrations={ registrations } /> },
    { label: 'Waiting List', component: <Waitings event={ event } waitings={ waitings } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = []
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/events_events/${props.params.id}/audits`,
  event: `/api/admin/events/events/${props.params.id}`,
  registrations: `/api/admin/events/events/${props.params.id}/registrations`,
  sessions: `/api/admin/events/events/${props.params.id}/sessions`,
  waitings: `/api/admin/events/events/${props.params.id}/waitings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Event',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
