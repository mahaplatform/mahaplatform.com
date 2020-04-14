import EventToken from '../../tokens/event'
import { Page } from 'maha-admin'
import Clone from './clone'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Events',
  collection: {
    endpoint: '/api/admin/events/events',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: EventToken },
      { label: 'Program', key: 'program.title', sort: 'program'},
      { label: 'Registrations', key: 'registrations_count', collapsing: true, align: 'right' },
      { label: 'Tickets', key: 'tickets_count', collapsing: true, align: 'right' },
      { label: 'Waiting', key: 'waitings_count', collapsing: true, align: 'right' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right', format: 'currency' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'calendar',
      title: 'No Events',
      text: 'You have not yet created any events',
      buttons: [
        { label: 'Create Event', modal: <New programs={ resources.programs } /> }
      ]
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/admin/events/events/${record.id}`),
    recordTasks: (record) => [
      {
        label: 'Clone Event',
        modal: <Clone programs={ resources.programs } event_id={ record.id } />
      }
    ]
  },
  task: {
    icon: 'plus',
    modal: <New programs={ resources.programs } />
  }
})

const mapResourcesToPage = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      access_type: {
        $in: ['manage','edit']
      }
    }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
