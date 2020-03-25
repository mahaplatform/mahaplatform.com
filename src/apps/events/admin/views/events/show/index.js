import Sessions from './sessions'
import Waitings from './waitings'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, event, sessions, waitings }) => ({
  items: [
    { label: 'Details', component: <Details event={ event } audits={ audits } /> },
    { label: 'Sessions', component: <Sessions sessions={ sessions } /> },
    { label: 'Waiting List', component: <Waitings waitings={ waitings } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = []
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/events_events/${props.params.id}/audits`,
  event: `/api/admin/events/events/${props.params.id}`,
  sessions: `/api/admin/events/events/${props.params.id}/sessions`,
  waitings: `/api/admin/events/events/${props.params.id}/waitings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Event',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
