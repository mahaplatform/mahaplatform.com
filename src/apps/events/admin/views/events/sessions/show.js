import Attendance from './attendance'
import { Page } from '@admin'
import Details from './details'
import React from 'react'
import Edit from './edit'
import Scan from './scan'

const getTabs = ({ audits, attendings, event, session }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } session={ session } /> },
    { label: 'Attendance', component: <Attendance event={ event } session={ session } attendings={ attendings } /> }
  ]
})

const getTasks = ({ event, session }) => ({
  items: [
    {
      label: 'Edit Session',
      modal: <Edit event={ event } session={ session } />
    }, {
      label: 'Scan Tickets',
      modal: <Scan event={ event } session={ session } />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/events_sessions/${props.params.id}/audits`,
  event: `/api/admin/events/events/${props.params.event_id}`,
  session: `/api/admin/events/events/${props.params.event_id}/sessions/${props.params.id}`,
  attendings: `/api/admin/events/events/${props.params.event_id}/sessions/${props.params.id}/attendings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Session',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
