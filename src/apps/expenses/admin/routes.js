import { Routes } from 'maha-admin'
import AccountList from './views/accounts/list'
import AdvanceShow from './views/advances/show'
import ApprovalList from './views/items/approvals'
import BatchList from './views/batches/list'
import CheckShow from './views/checks/show'
import ExpenseShow from './views/expenses/show'
import ExpenseTypeList from './views/expense_types/list'
import ItemList from './views/items/list'
import ProjectList from './views/projects/list'
import ProjectShow from './views/projects/show'
import RateList from './views/rates/list'
import ReceiptShow from './views/receipts/show'
import ReimbursementShow from './views/reimbursements/show'
import ReportList from './views/items/report'
import TripShow from './views/trips/show'
import VendorList from './views/vendors/list'

const routes = new Routes([
  { path: '/accounts', component: AccountList },
  { path: '/approvals', component: ApprovalList },
  { path: '/advances/:id', component: AdvanceShow },
  { path: '/batches', component: BatchList },
  { path: '/checks/:id', component: CheckShow },
  { path: '/expenses/:id', component: ExpenseShow },
  { path: '/expense_types', component: ExpenseTypeList },
  { path: '/items', component: ItemList },
  { path: '/projects', component: ProjectList },
  { path: '/projects/:id', component: ProjectShow },
  { path: '/rates', component: RateList },
  { path: '/reimbursements/:id', component: ReimbursementShow },
  { path: '/reports', component: ReportList },
  { path: '/receipts/:id', component: ReceiptShow },
  { path: '/trips/:id', component: TripShow },
  { path: '/vendors', component: VendorList }
])

export default routes
