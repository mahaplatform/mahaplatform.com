// import checkOwnerApprover from '../../utils/check_owner_approver'
import CompactExpenseTypeToken from '../../tokens/expense_type_token/compact'
import CompactProjectToken from '../../tokens/project_token/compact'
import CompactTypeToken from '../../tokens/type_token/compact'
import ExpenseTypeToken from '../../tokens/expense_type_token'
import ProjectToken from '../../tokens/project_token'
import StatusToken from '../../tokens/status_token'
import VendorToken from '../../tokens/vendor_token'
import TypeToken from '../../tokens/type_token'
import Status from '../../tokens/status'
import { Page, CompactUserToken } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Approvals',
  // access: checkOwnerApprover,
  collection: {
    endpoint: '/api/admin/expenses/approvals',
    table: [
      { label: 'ID', key: 'item_id', visible: false, collapsing: true },
      { label: null, key: 'type', primary: true, collapsing: true, format: CompactTypeToken },
      { label: 'Date', key: 'date', format: 'date', collapsing: true },
      { label: 'User', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Project', key: 'project.title', sort: 'expenses_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description' },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'expenses_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'expenses_vendors.name' },
      { label: 'Account', key: 'account.name', sort: 'expenses_accounts.name' },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true },
      { label: 'Status', key: 'status', sort: 'expenses_statuses.text', format: Status, collapsing: true }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: CompactUserToken },
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
      { label: 'Expense Type', key: 'expense_type.title' },
      { label: 'Description', key: 'description' },
      { label: 'Amount', key: 'amount' },
      { label: 'Status', key: 'status' }
    ],
    link: (record) => `/admin/expenses/${record.type}s/${record.item_id}`,
    defaultSort: { key: 'created_at', order: 'desc' },
    selectable: true,
    entity: 'items',
    icon: 'dollar',
    empty: 'No items have been submitted yet in a project you own',
    rowClass: (record) => record.status
  }
})

export default Page(null, mapPropsToPage)
