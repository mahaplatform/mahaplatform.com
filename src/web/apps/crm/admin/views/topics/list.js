import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Topics',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/topics',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any topics',
    entity: 'topic',
    icon: 'info-circle',
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
