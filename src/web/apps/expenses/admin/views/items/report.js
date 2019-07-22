import { getIntegrationColumn, getIntegrationExport, getIntegrationTasks } from '../integration'
import CompactExpenseTypeToken from '../../tokens/expense_type_token/compact'
import CompactProjectToken from '../../tokens/project_token/compact'
import CompactVendorToken from '../../tokens/vendor_token/compact'
import ExpenseTypeToken from '../../tokens/expense_type_token'
import CompactTypeToken from '../../tokens/type_token/compact'
import ProjectToken from '../../tokens/project_token'
import StatusToken from '../../tokens/status_token'
import VendorToken from '../../tokens/vendor_token'
import BatchToken from '../../tokens/batch_token'
import { Page, UserToken } from 'maha-admin'
import TypeToken from '../../tokens/type_token'
import Status from '../../tokens/status'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/expenses/settings'
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Report',
  collection: {
    endpoint: '/api/admin/expenses/report',
    table: [
      { label: 'ID', key: 'item_id', visible: false, collapsing: true },
      { label: null, key: 'type', primary: true, collapsing: true, format: CompactTypeToken },
      { label: 'Date', key: 'date', format: 'date', collapsing: true },
      { label: 'User', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Project', key: 'project.title', sort: 'expenses_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description' },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'expenses_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'expenses_vendors.name', format: CompactVendorToken },
      { label: 'Account', key: 'account.name', sort: 'expenses_accounts.name' },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true },
      { label: 'Status', key: 'status', sort: 'expenses_statuses.text', format: Status, collapsing: true },
      ...getIntegrationColumn(resources.app.settings.integration)
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
      { label: 'Batch', name: 'batch_id', type: 'select', endpoint: '/api/admin/expenses/batches', value: 'id', text: 'title', format: BatchToken },
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Expense Type', name: 'expense_type_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
      { label: 'Vendor', name: 'vendor_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name', format: VendorToken },
      { label: 'Account', name: 'account_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/accounts', value: 'id', text: 'name' },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
      { label: 'Status', name: 'status_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/statuses', value: 'id', text: 'name', sort: 'id', format: StatusToken }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Type', key: 'type' },
      { label: 'Date', key: 'date' },
      { label: 'User', key: 'user.full_name' },
      { label: 'Project', key: 'project.title' },
      { label: 'Expense Type', key: 'expense_type.title' },
      { label: 'Vendor', key: 'vendor.name' },
      { label: 'Account', key: 'account.name' },
      { label: 'Description', key: 'description' },
      { label: 'Amount', key: 'amount' },
      { label: 'Status', key: 'status' },
      ...getIntegrationExport(resources.app.settings.integration)
    ],
    link: (record) => `/admin/expenses/${record.type}s/${record.item_id}`,
    defaultSort: { key: 'created_at', order: 'desc' },
    rowClass: (record) => record.status,
    buttons: (props) => props.selected.length > 0 ? [
      getIntegrationTasks(resources.app.settings.integration, context, props)
    ] : null,
    selectable: true
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
