// import checkOwnerApprover from '../../utils/check_owner_approver'
import CompactExpenseTypeToken from '../../tokens/expense_type/compact'
import CompactProjectToken from '../../tokens/project/compact'
import ExpenseTypeToken from '../../tokens/expense_type'
import CompactTypeToken from '../../tokens/type/compact'
import ProjectToken from '../../tokens/project'
import VendorToken from '../../tokens/vendor'
import StatusToken from '../../tokens/status_token'
import ReimbursementNew from '../reimbursements/new'
import TypeToken from '../../tokens/type'
import Status from '../../tokens/status'
import AdvanceNew from '../advances/new'
import CheckNew from '../checks/new'
import ExpenseNew from '../expenses/new'
import ItemTask from './item_task'
import TripNew from '../trips/new'
import { Page } from 'maha-admin'
import TripImport from './import'
import batchTask from '../batch'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Items',
  collection: {
    endpoint: '/api/admin/expenses/items',
    table: [
      { label: 'ID', key: 'item_id', visible: false, collapsing: true },
      { label: 'Type', key: 'type', collapsing: true, format: CompactTypeToken },
      { label: 'Date', key: 'date', format: 'date', collapsing: true },
      { label: 'Project', key: 'project.title', sort: 'expenses_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description', primary: true },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'expenses_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'expenses_vendors.name' },
      { label: 'Account', key: 'account.name', sort: 'expenses_accounts.name' },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true },
      { label: 'Status', key: 'status', primary: true, sort: 'expenses_statuses.text', format: Status, collapsing: true }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
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
    selectable: true,
    entity: 'items',
    icon: 'dollar',
    buttons: (props) => props.selected.length > 0 ? [
      batchTask(context, props, 'blue', 'submit', 'submitted', 'pending', '/api/admin/expenses/items/submit_all')
    ] : null
  },
  tasks: {
    icon: 'plus',
    items: [
      { component: ItemTask('expense', 'Expense', 'I made a purchase with a work credit card or store account'), modal: ExpenseNew },
      { component: ItemTask('reimbursement', 'Reimbursement', 'I made a purchase with my own money'), modal: ReimbursementNew },
      { component: ItemTask('check', 'Check Request', 'I need a check sent to a vendor'), modal: CheckNew },
      { component: ItemTask('trip', 'Mileage', 'I need to be reimbursed for mileage'), modal: TripNew },
      { component: ItemTask('import', 'Bulk Mileage Import', 'I need to be reimbursed for many trips'), modal: TripImport },
      { component: ItemTask('advance', 'Cash Advance', 'I need a check or cash in advance'), modal: AdvanceNew }
    ]
  }
})


export default Page(null, mapPropsToPage)
