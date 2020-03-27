import Attendance from './attendance'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Scan from './scan'

const getTabs = ({ session }) => ({
  items: [
    { label: 'Details', component: <Details session={ session } /> },
    { label: 'Attendance', component: <Attendance session={ session } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = [
    {
      label: 'Scan Tickets',
      modal: <Scan  />
    }
  ]
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  session: `/api/admin/events/events/${props.params.event_id}/sessions/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Session',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
