import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Payments',
  collection: {
    endpoint: '/api/admin/finance/payments',
    table: [
      { label: 'ID', key: 'id', primary: true, collapsing: true },
      { label: 'Code', key: 'code', sort: 'code', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'dollar',
      title: 'No Payment',
      text: 'You have not yet created any payments'
    },
    entity: 'payment'
  }
})

export default Page(null, mapPropsToPage)
