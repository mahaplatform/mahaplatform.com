// import checkOwnerApprover from '../../utils/check_owner_approver'
import CompactExpenseTypeToken from '../../tokens/expense_type_token/compact'
import TripsImportFinalize from '../../components/trips_import_finalize'
import CompactProjectToken from '../../tokens/project_token/compact'
import ExpenseTypeToken from '../../tokens/expense_type_token'
import CompactTypeToken from '../../tokens/type_token/compact'
import ProjectToken from '../../tokens/project_token'
import VendorToken from '../../tokens/vendor_token'
import StatusToken from '../../tokens/status_token'
import ReimbursementNew from '../reimbursements/new'
import TypeToken from '../../tokens/type_token'
import Status from '../../tokens/status'
import AdvanceNew from '../advances/new'
import CheckNew from '../checks/new'
import ExpenseNew from '../expenses/new'
import TripNew from '../trips/new'
import { Import, Page } from 'maha-admin'
import batchTask from '../batch'
import React from 'react'

const _getImport = (user) => ({
  table: 'expenses_trips',
  fields: [
    { label: 'Date', name: 'date', type: 'datefield', required: true, format: 'YYYY-MM-DD' },
    { label: 'Description', name: 'description', type: 'textfield', required: true },
    { label: 'Project Code', name: 'project_code', type: 'textfield' },
    { label: 'Time Leaving', name: 'time_leaving', type: 'timefield', format: 'HH:mm:ss' },
    { label: 'Time Arriving', name: 'time_arriving', type: 'timefield', format: 'HH:mm:ss' },
    { label: 'Odometer Start', name: 'odometer_start', type: 'textfield' },
    { label: 'Odometer End', name: 'odometer_end', type: 'textfield' },
    { label: 'Distance', name: 'total_miles', type: 'textfield' }
  ],
  primaryKey: null,
  rules: {
    date: ['required'],
    description: ['required']
  },
  destination: (import_id) => `/admin/expenses/items?$filter[import_id][$in][0]=${import_id}`,
  defaultParams: {
    user_id: user.id,
    status_id: 2
  },
  defaultMapping: [
    {
      field:'date',
      header:'Date',
      type:'datefield',
      relation:null,
      format: 'YYYY-MM-DD'
    },{
      field:'description',
      header:'Description',
      type:'text',
      relation:null
    },{
      field:'project_id',
      header:'Project Code',
      type:'relation',
      relation:'expenses_projects',
      relationcolumn:'integration.project_code'
    },{
      field:'time_leaving',
      header:'Time Leaving',
      type:'timefield',
      relation:null,
      format: 'HH:mm:ss'
    },{
      field:'time_arriving',
      header:'Time Arriving',
      type:'timefield',
      relation:null,
      format: 'HH:mm:ss'
    },{
      field:'odometer_start',
      header:'Odometer Start',
      type:'integer',
      relation:null
    },{
      field:'odometer_end',
      header:'Odometer End',
      type:'integer',
      relation:null
    },{
      field:'total_miles',
      header:'Distance',
      type:'integer',
      relation:null
    }
  ],
  finalizeComponent: TripsImportFinalize

})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Items',
  collection: {
    endpoint: '/api/admin/expenses/items',
    table: [
      { label: 'ID', key: 'item_id', visible: false, collapsing: true },
      { label: null, key: 'type', primary: true, collapsing: true, format: CompactTypeToken },
      { label: 'Date', key: 'date', format: 'date', collapsing: true },
      { label: 'Project', key: 'project.title', sort: 'expenses_projects.title', format: CompactProjectToken },
      { label: 'Description', key: 'description', primary: true },
      { label: 'Expense Type', key: 'expense_type.title', sort: 'expenses_expense_types.title', format: CompactExpenseTypeToken },
      { label: 'Vendor', key: 'vendor.name', sort: 'expenses_vendors.name' },
      { label: 'Account', key: 'account.name', sort: 'expenses_accounts.name' },
      { label: 'Amount', key: 'amount', primary: true, format: 'currency', collapsing: true },
      { label: 'Status', key: 'status', sort: 'expenses_statuses.text', format: Status, collapsing: true }
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
      { label: 'Project', key: 'project.title' },
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
    rowClass: (record) => record.status,
    buttons: (props) => props.selected.length > 0 ? [
      batchTask(context, props, 'blue', 'submit', 'submitted', 'pending', '/api/admin/expenses/items/submit_all')
    ] : null
  },
  tasks: {
    icon: 'plus',
    items: [
      { component: itemTask('expense', 'Expense', 'I made a purchase with a work credit card or store account'), modal: ExpenseNew },
      { component: itemTask('reimbursement', 'Reimbursement', 'I made a purchase with my own money'), modal: ReimbursementNew },
      { component: itemTask('check', 'Check Request', 'I need a check sent to a vendor'), modal: CheckNew },
      { component: itemTask('trip', 'Mileage', 'I need to be reimbursed for mileage'), modal: TripNew },
      { component: itemTask('import', 'Bulk Mileage Import', 'I need to be reimbursed for many trips'), modal: () => <Import {..._getImport(props.user)} /> },
      { component: itemTask('advance', 'Cash Advance', 'I need a check or cash in advance'), modal: AdvanceNew }
    ]
  }
})

const itemTask = (type, title, text) => (
  <div className="new-item-task">
    <div className="new-item-task-icon">
      <CompactTypeToken value={ type } />
    </div>
    <div className="new-item-task-description">
      <strong>{ title }</strong><br />
      { text }
    </div>
  </div>
)

export default Page(null, mapPropsToPage)
