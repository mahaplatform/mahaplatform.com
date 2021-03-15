import { Page } from '@admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Websites',
  collection: {
    endpoint: '/api/admin/websites/websites',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'mouse-pointer',
      title: 'No Websites',
      text: 'You have not yet created any websites',
      buttons: [
        { label: 'Create Website', modal: New }
      ]
    },
    entity: 'site',
    onClick: (record) => context.router.history.push(`/websites/websites/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: 'Add Website', modal: New }
    ]
  }
})

export default Page(null, mapPropsToPage)
