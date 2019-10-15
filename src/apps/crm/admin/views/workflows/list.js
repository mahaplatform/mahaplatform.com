import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Automation',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/workflows',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: {
      icon: 'cogs',
      title: 'No Workflow',
      text: 'You have not yet created any workflows',
      buttons: [
        { label: 'Create Workflow', modal: New }
      ]
    },
    entity: 'workflow',
    link: (record) => `/admin/crm/workflows/${record.id}`,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Workflow',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
