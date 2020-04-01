import Attendance from './attendance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ attendings, ticket }) => ({
  header: <img className="events-ticket-qrcode" src={`/qr/${ticket.code}`} />,
  items: [
    { label: 'Details', component: <Details ticket={ ticket } /> },
    { label: 'Attendance', component: <Attendance attendings={ attendings } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = []

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  ticket: `/api/admin/events/events/${props.params.event_id}/tickets/${props.params.id}`,
  attendings: `/api/admin/events/events/${props.params.event_id}/tickets/${props.params.id}/attendings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Ticket',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
