import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Sites',
  collection: {
    endpoint: '/api/admin/sites/sites',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'globe',
      title: 'No Sites',
      text: 'You have not yet created any sites',
      buttons: [
        { label: 'Create Site', modal: New }
      ]
    },
    entity: 'site',
    onClick: (record) => context.router.history.push(`/sites/sites/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: 'Add Site', modal: New }
    ]
  }
})

export default Page(null, mapPropsToPage)
