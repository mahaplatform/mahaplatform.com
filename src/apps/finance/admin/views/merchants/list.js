import StatusToken from '../../tokens/status'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Merchant Accounts',
  collection: {
    endpoint: '/api/admin/finance/merchants',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: StatusToken  }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/merchants/${record.id}`),
    empty: {
      icon: 'university',
      title: 'No Merchant Accounts',
      text: 'You have not yet added any merchant accounts',
      buttons: [
        { label: 'Add Merchant Account', modal: New }
      ]
    },
    entity: 'invoice'
  },
  task: {
    label: 'Add Merchant Account',
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
