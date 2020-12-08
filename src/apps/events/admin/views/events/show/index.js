import { Embed, Page } from '@admin'
import Performance from './performance'
import Workflows from './workflows'
import Sessions from './sessions'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, event, registrations, sessions, tickets, waitings, workflows }) => ({
  items: [
    { label: 'Details', component: <Details event={ event } audits={ audits } /> },
    { label: 'Sessions', component: <Sessions event={ event } sessions={ sessions } /> },
    { label: 'Workflows', component: <Workflows event={ event } workflows={ workflows } /> },
    { label: 'Performance', component: <Performance event={ event } /> }
  ]
})

const getTasks = ({ event }) => {

  const embed = {
    title: 'Button Code',
    header: (
      <p>You can place a <strong>Buy Tickets</strong> button on your
      website by pasting this code into your html.</p>
    ),
    code: `<div data-event="${event.code}"></div>
<script src="${process.env.WEB_HOST}/maha.js"></script>
<script>
new Maha.Events.Button({
  code: '${event.code}',
  className: 'button',
  label: 'Buy Tickets'
})
</script>`
  }

  const items = []

  if(!event.deleted_at) {
    items.push({ label: 'Edit Event', modal: <Edit event={ event } /> })
    items.push({
      label: 'Get Button Code',
      modal: {
        component: <Embed { ...embed } />,
        options: {
          width: 640,
          height: 480
        }
      }
    })
    items.push({
      label: 'Delete Event',
      confirm: `
        Are you sure you want to delete this event? You will also delete all of
        the associated workflows, emails, and performance data
      `,
      request: {
        endpoint: `/api/admin/events/events/${event.id}`,
        method: 'delete'
      }
    })
  }

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/events_events/${props.params.id}/audits`,
  event: `/api/admin/events/events/${props.params.id}`,
  registrations: `/api/admin/events/events/${props.params.id}/registrations`,
  sessions: `/api/admin/events/events/${props.params.id}/sessions`,
  tickets: `/api/admin/events/events/${props.params.id}/tickets`,
  waitings: `/api/admin/events/events/${props.params.id}/waitings`,
  workflows: `/api/admin/events/events/${props.params.id}/workflows`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Event',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
