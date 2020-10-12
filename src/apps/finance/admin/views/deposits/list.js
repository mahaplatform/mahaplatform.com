import StatusToken from '../../tokens/status_token'
import Status from '../../tokens/status'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Deposits',
  rights: ['finance:manage_deposits'],
  collection: {
    endpoint: '/api/admin/finance/deposits',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Bank Account', key: 'bank.title', sort:'bank', primary: true },
      { label: 'Date', key: 'date', collapsing: true, format: 'date' },
      { label: 'Payments', key: 'payments_count', collapsing: true, align: 'right' },
      { label: 'Refunds', key: 'refunds_count', collapsing: true, align: 'right' },
      { label: 'Amount', key: 'amount', collapsing: true, format: 'currency' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, align: 'center', padded: true, format: Status }
    ],
    filters: [
      { label: 'Bank Account', name: 'bank_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/banks', value: 'id', text: 'title' },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options: ['pending','exported'], format: StatusToken }
    ],
    defaultSort: { key: 'date', order: 'desc' },
    onClick: (record) => context.router.history.push(`/finance/deposits/${record.id}`),
    empty: {
      icon: 'university',
      title: 'No Disbursements',
      text: 'You do not recveived any deposits',
      buttons: [
        { label: 'Add Bank Account', modal: New }
      ]
    },
    entity: 'deposits'
  },
  task: {
    label: 'Add Bank Account',
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
