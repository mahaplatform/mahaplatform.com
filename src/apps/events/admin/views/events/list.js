import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Events',
  collection: {
    endpoint: '/api/admin/events/events',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'calendar',
      title: 'No Events',
      text: 'You have not yet created any events',
      buttons: [
        { label: 'Create Event', modal: New }
      ]
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/admin/events/events/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
