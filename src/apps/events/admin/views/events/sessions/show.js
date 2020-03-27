import Attendance from './attendance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Scan from './scan'

const getTabs = ({ attendings, event, session }) => ({
  items: [
    { label: 'Details', component: <Details session={ session } /> },
    { label: 'Attendance', component: <Attendance event={ event } session={ session } attendings={ attendings } /> }
  ]
})

const getTasks = ({ event, session }) => ({
  items: [
    {
      label: 'Scan Tickets',
      modal: <Scan event={ event } session={ session } />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  event: `/api/admin/events/events/${props.params.event_id}`,
  session: `/api/admin/events/events/${props.params.event_id}/sessions/${props.params.id}`,
  attendings: `/api/admin/events/events/${props.params.event_id}/sessions/${props.params.id}/attendings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Session',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
