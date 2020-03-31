import ProgramForm from '../../../../crm/admin/components/programform'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Events',
  collection: {
    endpoint: '/api/admin/events/events',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Registrations', key: 'registrations_count', collapsing: true, align: 'right' },
      { label: 'Tickets', key: 'tickets_count', collapsing: true, align: 'right' },
      { label: 'Waiting', key: 'waitings_count', collapsing: true, align: 'right' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right', format: 'currency' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'calendar',
      title: 'No Events',
      text: 'You have not yet created any events',
      buttons: [
        { label: 'Create Event', modal: <ProgramForm programs={ resources.programs } form={ New } /> }
      ]
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/admin/events/events/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: <ProgramForm programs={ resources.programs } form={ New } />
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
