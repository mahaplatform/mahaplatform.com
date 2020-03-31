import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Events',
  collection: {
    endpoint: `/api/admin/events/events/${page.params.event_id}/registrations`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.full_name', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'contact',
      title: 'No Registrations',
      text: 'No one has registered for this events',
      buttons: []
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/admin/events/events/${page.params.event_id}/registrations/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
