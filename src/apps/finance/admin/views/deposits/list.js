import Status from '../../tokens/status'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Deposits',
  collection: {
    endpoint: '/api/admin/finance/deposits',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Bank Account', key: 'bank.title', sort:'bank', primary: true },
      { label: 'Date', key: 'date', collapsing: true, format: 'date' },
      { label: 'Payments', key: 'payments_count', collapsing: true, align: 'right' },
      { label: 'Total', key: 'total', collapsing: true, format: 'currency' },
      { label: 'Fee', key: 'fee', collapsing: true, format: 'currency' },
      { label: 'Amount', key: 'amount', collapsing: true, format: 'currency' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, align: 'center', padded: true, format: Status }
    ],
    filters: [
      { label: 'Bank Account', name: 'bank_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/banks', value: 'id', text: 'title' },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/deposits/${record.id}`),
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
