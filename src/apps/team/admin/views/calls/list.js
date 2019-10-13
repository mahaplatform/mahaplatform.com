import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Calls',
  collection: {
    endpoint: '/api/admin/team/calls',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'type', key: 'type', primary: true },
      { label: 'From', key: 'from', primary: true },
      { label: 'To', key: 'to', primary: true }
    ],
    empty: 'You have not yet made or received any calls',
    entity: 'call',
    icon: 'phone',
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(null, mapPropsToPage)
