// import checkOwnerApprover from '../../utils/check_owner_approver'
import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import CompactTypeToken from '../../tokens/type/compact'
import ExpenseTypeToken from '../../tokens/expense_type'
import ProjectToken from '../../tokens/project'
import StatusToken from '../../tokens/status_token'
import VendorToken from '../../tokens/vendor'
import TypeToken from '../../tokens/type'
import Status from '../../tokens/status'
import { Page, UserToken } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Approvals',
  // access: checkOwnerApprover,
  collection: {
    endpoint: '/api/admin/finance/approvals',
    table: [
      { label: 'ID', key: 'item_id', width: 80, visible: false },
      { label: 'Type', key: 'type', width: 80, format: CompactTypeToken },
      { label: 'Date', key: 'date', width: 90, format: 'date' },
      { label: 'User', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Project', key: 'project.title', sort: 'finance_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description' },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'finance_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'finance_vendors.name' },
      { label: 'Account', key: 'account.name', sort: 'finance_accounts.name' },
      { label: 'Amount', key: 'amount', width: 100, primary: true, format: 'currency' },
      { label: 'Status', key: 'status', width: 100, primary: true, align: 'center', format: Status }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
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
    empty: {
      icon: 'dollar',
      title: 'No Items',
      text: 'No items have been submitted yet in a project you own'
    },
    entity: 'items',
    onClick: (record) => context.router.history.push(`/admin/finance/${record.type}s/${record.item_id}`)
  }
})

export default Page(null, mapPropsToPage)
