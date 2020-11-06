import EventToken from '../../tokens/event'
import { Logo, Page } from '@admin'
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
    criteria: {
      fields: [
        { label: 'Event', fields: [
          { name: 'Program', key: 'program_id', type: 'select', endpoint: '/api/admin/crm/programs', text: 'title', value: 'id' }
        ] }
      ],
      system: resources.programs.map((program, index) => (
        { id: index, title: program.title, token: <Logo team={ program } width="24" />, config: {
          criteria: [
            { code: 'abc', data: null, field: null, operator: '$and', parent: null, value: null },
            { code: 'def', data: null, field: 'program_id', operator: '$eq', parent: 'abc', value: program.id }
          ]
        } }
      ))
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'calendar-o',
      title: 'No Events',
      text: 'You have not yet created any events',
      buttons: [
        { label: 'Create Event', modal: <New programs={ resources.programs } /> }
      ]
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/events/events/${record.id}`),
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
  programs: '/api/admin/crm/programs'
})

export default Page(mapResourcesToPage, mapPropsToPage)
