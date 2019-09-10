import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Senders',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/topics',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sender', key: 'name', primary: true }
    ],
    empty: 'You have not yet registered any senders',
    entity: 'sender',
    icon: 'envelope',
    link: (record) => `/admin/crm/topics/${record.id}`,
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Topics',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
