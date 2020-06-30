import { Page } from 'maha-admin'
import Status from '../../tokens/status'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Deposits',
  collection: {
    endpoint: '/api/admin/finance/deposits',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Merchant Account', key: 'merchant.title', sort:'merchant', primary: true },
      { label: 'Date', key: 'date', collapsing: true, format: 'date' },
      { label: 'Payments', key: 'payments_count', collapsing: true, align: 'right' },
      { label: 'Total', key: 'total', collapsing: true, format: 'currency' },
      { label: 'Fee', key: 'fee', collapsing: true, format: 'currency' },
      { label: 'Amount', key: 'amount', collapsing: true, format: 'currency' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, align: 'center', padded: true, format: Status }
    ],
    filters: [
      { label: 'Merchant Account', name: 'merchant_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/merchants', value: 'id', text: 'title' },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/deposits/${record.id}`),
    empty: {
      icon: 'university',
      title: 'No Disbursements',
      text: 'You do not recveived any deposits'
    },
    entity: 'deposits'
  }
})

export default Page(null, mapPropsToPage)
