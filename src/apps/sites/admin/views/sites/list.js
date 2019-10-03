import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Sites',
  collection: {
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    endpoint: '/api/admin/sites/sites',
    empty: 'You have not yet created any sites',
    entity: 'site',
    icon: 'globe',
    link: (record) => `/admin/sites/sites/${record.id}`,
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: 'Add Site', modal: New }
    ]
  }
})

export default Page(null, mapPropsToPage)
