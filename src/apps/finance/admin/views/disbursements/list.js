import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Disbursements',
  collection: {
    endpoint: '/api/admin/finance/disbursements',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Merchant Account', key: 'merchant.title', sort:'merchant', primary: true },
      { label: 'Date', key: 'date', collapsing: true, primary: true, format: 'date' },
      { label: 'Amount', key: 'amount', collapsing: true, primary: true, format: 'currency' }
    ],
    filters: [
      { label: 'Merchant Account', name: 'merchant_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/merchants', value: 'id', text: 'title' },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/disbursements/${record.id}`),
    empty: {
      icon: 'university',
      title: 'No Disbursements',
      text: 'You do not recveived any disbursements'
    },
    entity: 'disbursements'
  }
})

export default Page(null, mapPropsToPage)
