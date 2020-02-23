import CompactRevenueTypeToken from '../../tokens/revenue_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import RevenueTypeToken from '../../tokens/revenue_type'
import ProjectToken from '../../tokens/project'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Revenue Report',
  collection: {
    endpoint: '/api/admin/finance/reports/revenue',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Customer', key: 'customer.display_name', sort: 'customer', visible: true },
      { label: 'Description', key: 'description', visible: true },
      { label: 'Program', key: 'program.title', sort: 'program' },
      { label: 'Project', key: 'project.title', sort: 'project', format: CompactProjectToken },
      { label: 'Revenue Type', key: 'revenue_type.title', sort: 'revenue_type', format: CompactRevenueTypeToken },
      { label: 'Date', key: 'date', sort: 'date', format: 'date' },
      { label: 'Amount', key: 'amount', visible: true, format: 'currency' }
    ],
    filters: [
      { label: 'Customer', name: 'customer_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/customers', value: 'id', text: 'display_name', sort: { key: 'last_name', order: 'asc' } },
      { label: 'Program', name: 'program_id', type: 'select', multiple: true, endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Revenue Type', name: 'revenue_type_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', format: RevenueTypeToken },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] }
    ],
    defaultSort: { key: 'date', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/finance/payments/${record.payment_id}`),
    empty: {
      icon: 'dollar',
      title: 'No Results',
      text: 'There is no data for this report'
    },
    entity: 'payment'
  }
})

export default Page(null, mapPropsToPage)
