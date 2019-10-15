import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Lists',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/lists',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'name', primary: true },
      { label: 'Type', key: 'type' }
    ],
    empty: {
      icon: 'users',
      title: 'No Lists',
      text: 'You have not yet created any lists',
      buttons: [
        { label: 'Create New List', modal: New }
      ]
    },
    entity: 'list',
    onClick: (record) => context.router.history.push(`/admin/crm/lists/${record.id}`),
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
