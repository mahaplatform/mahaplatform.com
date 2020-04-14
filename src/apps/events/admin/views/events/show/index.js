import Performance from './performance'
import Sessions from './sessions'
import { Page } from 'maha-admin'
import Tickets from './tickets'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, event, registrations, sessions, tickets, waitings }) => ({
  items: [
    { label: 'Details', component: <Details event={ event } audits={ audits } /> },
    { label: 'Sessions', component: <Sessions event={ event } sessions={ sessions } /> },
    { label: 'Tickets', component: <Tickets event={ event } tickets={ tickets } /> },
    { label: 'Performance', component: <Performance event={ event } /> }
  ]
})

const getTasks = ({ event }) => {
  const items = [
    { label: 'Edit Event', modal: <Edit event={ event } /> },
    {
      label: 'Delete Event',
      confirm: `
        Are you sure you want to delete this event? You will also delete all of
        the associated workflows, emails, and performance data
      `,
      request: {
        endpoint: `/api/admin/events/events/${event.id}`,
        method: 'delete'
      }
    }
  ]
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/events_events/${props.params.id}/audits`,
  event: `/api/admin/events/events/${props.params.id}`,
  registrations: `/api/admin/events/events/${props.params.id}/registrations`,
  sessions: `/api/admin/events/events/${props.params.id}/sessions`,
  tickets: `/api/admin/events/events/${props.params.id}/tickets`,
  waitings: `/api/admin/events/events/${props.params.id}/waitings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Event',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
