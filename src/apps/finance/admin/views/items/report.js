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
  app: '/api/admin/apps/finance/settings'
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Report',
  collection: {
    endpoint: '/api/admin/finance/items/report',
    table: [
      { label: 'ID', key: 'item_id', visible: false, width: 60 },
      { label: 'Type', key: 'type', width: 60, format: CompactTypeToken },
      { label: 'Date', key: 'date', width: 80, format: 'date' },
      { label: 'User', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Project', key: 'project.title', sort: 'finance_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description' },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'finance_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'finance_vendors.name', format: CompactVendorToken },
      { label: 'Account', key: 'account.name', sort: 'finance_accounts.name'},
      { label: 'Amount', key: 'amount', width: 100, primary: true, format: 'currency' },
      { label: 'Status', key: 'status', width: 80, primary: true, format: Status }
    ],
    // criteria: [
    //   { label: 'item', fields: [
    //     { name: 'type', key: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
    //     { name: 'batch', key: 'batch_id', type: 'select', endpoint: '/api/admin/finance/batches', value: 'id', text: 'title', format: BatchToken },
    //     { name: 'user', key: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
    //     { name: 'project', key: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', format: ProjectToken },
    //     { name: 'expense type', key: 'expense_type_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
    //     { name: 'vendor', key: 'vendor_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/vendors', value: 'id', text: 'name', format: VendorToken },
    //     { name: 'account', key: 'account_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/accounts', value: 'id', text: 'name' },
    //     { name: 'date range', key: 'date', type: 'daterange', include: ['this','last'] },
    //   ] }
    // ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
      { label: 'Batch', name: 'batch_id', type: 'select', endpoint: '/api/admin/finance/batches', value: 'id', text: 'title', format: BatchToken },
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Expense Type', name: 'expense_type_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
      { label: 'Vendor', name: 'vendor_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/vendors', value: 'id', text: 'name', format: VendorToken },
      { label: 'Account', name: 'account_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/accounts', value: 'id', text: 'name' },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options: ['incomplete','pending','submitted','approved','rejected','reviewed','processed'], format: StatusToken }
    ],
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
    defaultSort: { key: 'created_at', order: 'desc' },
    selectable: true,
    selectValue: 'code',
    buttons: (selected) => [
      getIntegrationTasks(resources.app.settings.integration, context, selected)
    ],
    onClick: (record) => context.router.history.push(`/admin/finance/${record.type}s/${record.item_id}`)
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
