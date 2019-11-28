import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Disbursements',
  collection: {
    endpoint: '/api/admin/finance/disbursements',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Merchant Account', key: 'merchant.title', sort:'merchant', primary: true },
      { label: 'Date', key: 'date', primary: true, format: 'date', collapsing: true },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true }
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
