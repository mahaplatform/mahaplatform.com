import SenderToken from '../../tokens/sender'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Senders',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/senders',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sender', key: 'name', primary: true, format: SenderToken },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Verified', key: 'is_verified', primary: true, format: 'check' }
    ],
    empty: {
      icon: 'paper-plane-o',
      title: 'No Sender',
      text: 'You have not yet created any senders',
      buttons: [
        { label: 'Create New Sender', modal: New }
      ]
    },
    entity: 'sender',
    onClick: (record) => context.router.history.push(`/admin/crm/senders/${record.id}`),
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Sender',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
