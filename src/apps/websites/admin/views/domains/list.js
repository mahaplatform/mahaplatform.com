import { Page } from '@admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Domains',
  collection: {
    endpoint: '/api/admin/websites/domains',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'name', primary: true },
      { label: 'Status', key: 'status' }
    ],
    defaultSort: { key: 'name', order: 'asc' },
    empty: {
      icon: 'globe',
      title: 'No Domains',
      text: 'You have not yet created any domains',
      buttons: [
        { label: 'Create Domain', modal: New }
      ]
    },
    entity: 'site',
    onClick: (record) => context.router.history.push(`/websites/domains/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: 'Add Domain', modal: New }
    ]
  }
})

export default Page(null, mapPropsToPage)
