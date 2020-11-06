import ContactToken from '@apps/crm/admin/tokens/contact'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Customers',
  rights: ['finance:manage_revenue'], 
  collection: {
    endpoint: '/api/admin/finance/customers',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'display_name', primary: true, format: ContactToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/finance/customers/${record.id}`),
    empty: {
      icon: 'user',
      title: 'No Customers',
      text: 'You do not yet have any customers'
    },
    entity: 'customers'
  }
})

export default Page(null, mapPropsToPage)
