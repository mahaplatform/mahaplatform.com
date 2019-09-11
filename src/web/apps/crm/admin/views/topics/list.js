import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Topics',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/topics`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any topics',
    entity: 'topic',
    icon: 'book',
    link: (record) => `/admin/crm/programs/${page.params.program_id}/topics/${record.id}`,
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
