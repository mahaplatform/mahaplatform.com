import AccountList from './accounts/list'
import AdvanceShow from './advances/show'
import ApprovalList from './items/approvals'
import BatchList from './batches/list'
import CouponList from './coupons/list'
import CheckShow from './checks/show'
import ExpenseShow from './expenses/show'
import ExpenseTypeList from './expense_types/list'
import InvoiceList from './invoices/list'
import InvoiceShow from './invoices/show'
import ItemList from './items/list'
import PaymentList from './payments/list'
import ProductList from './products/list'
import ProjectList from './projects/list'
import ProjectShow from './projects/show'
import RateList from './rates/list'
import ReceiptShow from './receipts/show'
import ReimbursementShow from './reimbursements/show'
import ReportList from './items/report'
import RevenueTypeList from './revenue_types/list'
import TaxList from './items/tax'
import TripShow from './trips/show'
import VendorList from './vendors/list'

const routes = [
  { path: '/accounts', component: AccountList },
  { path: '/approvals', component: ApprovalList },
  { path: '/advances/:id', component: AdvanceShow },
  { path: '/batches', component: BatchList },
  { path: '/coupons', component: CouponList },
  { path: '/checks/:id', component: CheckShow },
  { path: '/expenses/:id', component: ExpenseShow },
  { path: '/expense_types', component: ExpenseTypeList },
  { path: '/invoices', component: InvoiceList },
  { path: '/invoices/:id', component: InvoiceShow },
  { path: '/items', component: ItemList },
  { path: '/payments', component: PaymentList },
  { path: '/products', component: ProductList },
  { path: '/projects', component: ProjectList },
  { path: '/projects/:id', component: ProjectShow },
  { path: '/rates', component: RateList },
  { path: '/reimbursements/:id', component: ReimbursementShow },
  { path: '/reports', component: ReportList },
  { path: '/tax', component: TaxList },
  { path: '/receipts/:id', component: ReceiptShow },
  { path: '/revenue_types', component: RevenueTypeList },
  { path: '/trips/:id', component: TripShow },
  { path: '/vendors', component: VendorList }
]

export default routes
