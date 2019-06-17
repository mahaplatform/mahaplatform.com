import AccountList from './accounts/list'
import AdvanceShow from './advances/show'
import ApprovalList from './items/approvals'
import BatchList from './batches/list'
import CheckShow from './checks/show'
import ExpenseShow from './expenses/show'
import ExpenseTypeList from './expense_types/list'
import ItemList from './items/list'
import ProjectList from './projects/list'
import ProjectShow from './projects/show'
import RateList from './rates/list'
import ReceiptShow from './receipts/show'
import ReimbursementShow from './reimbursements/show'
import ReportList from './items/report'
import TripShow from './trips/show'
import VendorList from './vendors/list'

const routes = [
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
]

export default routes
