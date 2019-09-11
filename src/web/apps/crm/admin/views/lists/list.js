import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Lists',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/lists`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'name', primary: true },
      { label: 'Type', key: 'type' }
    ],
    empty: 'You have not yet created any lists',
    entity: 'list',
    icon: 'users',
    link: (record) => `/api/admin/crm/programs/${page.params.program_id}/lists/${record.id}`,
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add List',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
