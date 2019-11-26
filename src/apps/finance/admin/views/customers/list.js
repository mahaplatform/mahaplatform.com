import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Customers',
  collection: {
    endpoint: '/api/admin/finance/customers',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'display_name', primary: true }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/customers/${record.id}`),
    empty: {
      icon: 'user',
      title: 'No Customers',
      text: 'You do not yet have any customers'
    },
    entity: 'customers'
  }
})

export default Page(null, mapPropsToPage)
