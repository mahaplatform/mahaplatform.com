import ContactToken from '../../../../../crm/admin/tokens/contact'
import PaymentToken from '../../../tokens/payment'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Events',
  collection: {
    endpoint: `/api/admin/events/events/${page.params.event_id}/registrations`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', sort: 'contact', primary: true, format: (registration) => <ContactToken { ...registration.contact } /> },
      { label: 'Submitted', key: 'created_at', format: 'datetime' },
      { label: 'Tickets', key: 'tickets_count', collapsing: true, align: 'right' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right' },
      { label: 'Status', key: 'is_paid', collapsing: true, format: PaymentToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'user',
      title: 'No Registrations',
      text: 'No one has registered for this event',
      buttons: []
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/admin/events/events/${page.params.event_id}/registrations/${record.id}`)
  },
  tasks: {
    items: [
      {
        label: 'Export Data',
        handler: () => {
          const { token } = context.admin.team
          window.location.href = `/api/admin/events/events/${props.params.event_id}/registrations/download.xlsx?filename=event-${resources.event.code}-responses&download=true&token=${token}`
        }
      }
    ]
  }
})

const mapResourcesToPage = (props, context) => ({
  event: `/api/admin/events/events/${props.params.event_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
