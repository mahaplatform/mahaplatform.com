import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Disbursements',
  collection: {
    endpoint: '/api/admin/finance/disbursements',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Bank Account', key: 'merchant.title', primary: true },
      { label: 'Date', key: 'date', primary: true, format: 'date', collapsing: true },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true }
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
