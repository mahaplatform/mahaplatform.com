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
  rights: ['finance:manage_expense'], 
  collection: {
    endpoint: '/api/admin/finance/items',
    table: [
      { label: 'ID', key: 'item_id', collapsing: true, visible: false },
      { label: 'Type', key: 'type', collapsing: true, format: CompactTypeToken },
      { label: 'Date', key: 'date', collapsing: true, format: 'date' },
      { label: 'Project', key: 'project.title', sort: 'finance_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description', primary: true },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'finance_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'finance_vendors.name' },
      { label: 'Account', key: 'account.name', sort: 'finance_accounts.name' },
      { label: 'Amount', key: 'amount', collapsing: true, primary: true, format: 'currency' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, align: 'center', padded: true, format: Status }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'reimbursement', text: 'Reimbursement' }, { value: 'check', text: 'Check Request' }, { value: 'trip', text: 'Mileage' }, { value: 'advance', text: 'Cash Advance' } ], format: TypeToken },
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Expense Type', name: 'expense_type_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
      { label: 'Vendor', name: 'vendor_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/vendors', value: 'id', text: 'name', format: VendorToken },
      { label: 'Account', name: 'account_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/accounts', value: 'id', text: 'name' },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options: ['incomplete','pending','submitted','approved','rejected','reviewed','exported'], format: StatusToken }
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
      text: 'You have not yet created any items'
    },
    selectable: true,
    selectValue: 'code',
    entity: 'items',
    buttons: (selected, onSuccess) => [
      batchTask(context, selected, onSuccess, 'blue', 'submit', 'submitted', 'pending', '/api/admin/finance/items/submit_all')
    ],
    onClick: (record) => context.router.history.push(`/admin/finance/${record.type}s/${record.item_id}`)
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
