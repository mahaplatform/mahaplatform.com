import { Page } from 'maha-admin'
import Details from './details'
import Edit from './edit'
import React from 'react'

const getTabs = ({ audits, organizer, events }) => ({
  items: [
    { label: 'Details', component: <Details organizer={ organizer } audits={ audits } /> },
    { label: 'Events', component: <Details organizer={ organizer } audits={ audits } /> }
  ]
})

const getTasks = ({ organizer }) => {
  const items = [
    { label: 'Edit Organizer', modal: <Edit organizer={ organizer } /> }
  ]
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/events_organizers/${props.params.id}/audits`,
  organizer: `/api/admin/events/organizers/${props.params.id}`,
  events: `/api/admin/events/organizers/${props.params.id}/events`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Organizer',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
