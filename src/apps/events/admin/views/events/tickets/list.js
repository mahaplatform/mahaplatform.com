import Content from '../../../../../crm/admin/tokens/content'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Tickets',
  collection: {
    endpoint: `/api/admin/events/events/${page.params.event_id}/tickets`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Attendee', key: 'name', primary: true },
      { label: 'Ticket Type', key: 'ticket_type.name', sort: 'ticket_type', primary: true },
      ...resources.event.ticket_config.fields.map(field => ({
        label: field.name.value,
        key: `values.${field.code}`,
        sort: field.code,
        visible: false,
        format: ({ values }) => <Content data={ values } field={ field } />
      }))
    ],
    filters: [
      { label: 'Ticket Type', name: 'ticket_type_id', type: 'select', options: resources.event.ticket_types.map(ticket_type => ({
        value: ticket_type.id,
        text: ticket_type.name
      })) }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Attendee', key: 'name'},
      { label: 'Ticket Type', key: 'ticket_type.name' },
      ...resources.event.ticket_config.fields.map(field => ({
        label: field.name.value,
        key: `values.${field.code}`
      }))
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'user',
      title: 'No Tickets',
      text: 'No one has purchased a ticket for this event',
      buttons: []
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/admin/events/events/${page.params.event_id}/tickets/${record.id}`)
  }
})

const mapResourcesToPage = (props, context) => ({
  event: `/api/admin/events/events/${props.params.event_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
