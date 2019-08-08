import { getIntegrationTasks } from '../integration'
import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import CompactVendorToken from '../../tokens/vendor/compact'
import ExpenseTypeToken from '../../tokens/expense_type'
import CompactTypeToken from '../../tokens/type/compact'
import ProjectToken from '../../tokens/project'
import StatusToken from '../../tokens/status_token'
import VendorToken from '../../tokens/vendor'
import BatchToken from '../../tokens/batch'
import { Page, UserToken } from 'maha-admin'
import TypeToken from '../../tokens/type'
import Status from '../../tokens/status'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/expenses/settings'
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Report',
  collection: {
    endpoint: '/api/admin/expenses/items/report',
    table: [
      { label: 'ID', key: 'item_id', visible: false, collapsing: true },
      { label: 'Type', key: 'type', collapsing: true, format: CompactTypeToken },
      { label: 'Date', key: 'date', format: 'date', collapsing: true },
      { label: 'User', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Project', key: 'project.title', sort: 'expenses_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description' },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'expenses_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'expenses_vendors.name', format: CompactVendorToken },
      { label: 'Account', key: 'account.name', sort: 'expenses_accounts.name' },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true },
      { label: 'Status', key: 'status', primary: true, sort: 'expenses_statuses.text', format: Status, collapsing: true }
    ],
    criteria: [
      { label: 'item', fields: [
        { name: 'type', key: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
        { name: 'batch', key: 'batch_id', type: 'select', endpoint: '/api/admin/expenses/batches', value: 'id', text: 'title', format: BatchToken },
        { name: 'user', key: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
        { name: 'project', key: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
        { name: 'expense type', key: 'expense_type_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
        { name: 'vendor', key: 'vendor_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name', format: VendorToken },
        { name: 'account', key: 'account_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/accounts', value: 'id', text: 'name' },
        { name: 'date range', key: 'date', type: 'daterange', include: ['this','last'] },
        { name: 'status', key: 'status_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/statuses', value: 'id', text: 'name', sort: 'id', format: StatusToken }
      ] }
    ],
    // filters: [
    //   { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
    //   { label: 'Batch', name: 'batch_id', type: 'select', endpoint: '/api/admin/expenses/batches', value: 'id', text: 'title', format: BatchToken },
    //   { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
    //   { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
    //   { label: 'Expense Type', name: 'expense_type_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
    //   { label: 'Vendor', name: 'vendor_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name', format: VendorToken },
    //   { label: 'Account', name: 'account_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/accounts', value: 'id', text: 'name' },
    //   { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
    //   { label: 'Status', name: 'status_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/statuses', value: 'id', text: 'name', sort: 'id', format: StatusToken }
    // ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Type', key: 'type' },
      { label: 'Date', key: 'date' },
      { label: 'User', key: 'user.full_name' },
      { label: 'Project Code', key: 'project.integration.project_code' },
      { label: 'Project', key: 'project.title' },
      { label: 'Expense Type Code', key: 'expense_type.integration.expense_code' },
      { label: 'Expense Type', key: 'expense_type.title' },
      { label: 'Vendor', key: 'vendor.name' },
      { label: 'Account', key: 'account.name' },
      { label: 'Description', key: 'description' },
      { label: 'Amount', key: 'amount' },
      { label: 'Status', key: 'status' }
    ],
    link: (record) => `/admin/expenses/${record.type}s/${record.item_id}`,
    defaultSort: { key: 'created_at', order: 'desc' },
    buttons: (props) => props.selected.length > 0 ? [
      getIntegrationTasks(resources.app.settings.integration, context, props)
    ] : null,
    selectable: true
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
