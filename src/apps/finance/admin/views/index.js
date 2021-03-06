import AccountList from './accounts/list'
import AdvanceShow from './advances/show'
import ApprovalList from './items/approvals'
import BatchList from './batches/list'
import CustomerList from './customers/list'
import CustomerShow from './customers/show'
import CheckShow from './checks/show'
import CreditShow from './customers/credits/show'
import DepositList from './deposits/list'
import DepositShow from './deposits/show'
import ExpenseShow from './expenses/show'
import InvoiceList from './invoices/list'
import InvoiceShow from './invoices/show'
import ItemList from './items/list'
import BankList from './banks/list'
import BankShow from './banks/show'
import PaymentList from './payments/list'
import PaymentShow from './payments/show'
import ProjectList from './projects/list'
import ProjectShow from './projects/show'
import RateList from './rates/list'
import ReceiptShow from './receipts/show'
import RefundList from './refunds/list'
import RefundShow from './refunds/show'
import ReimbursementShow from './reimbursements/show'
import ReportList from './reports/expense'
import RevenueReport from './reports/revenue'
import TaxList from './items/tax'
import TripShow from './trips/show'
import VendorList from './vendors/list'
import VendorShow from './vendors/show'

const routes = [
  { path: '/accounts', component: AccountList },
  { path: '/approvals', component: ApprovalList },
  { path: '/advances/:id', component: AdvanceShow },
  { path: '/batches', component: BatchList },
  { path: '/checks/:id', component: CheckShow },
  { path: '/customers', component: CustomerList },
  { path: '/customers/:id', component: CustomerShow },
  { path: '/customers/:customer_id/credits/:id', component: CreditShow },
  { path: '/expenses/:id', component: ExpenseShow },
  { path: '/deposits', component: DepositList },
  { path: '/deposits/:id', component: DepositShow },
  { path: '/invoices', component: InvoiceList },
  { path: '/invoices/:id', component: InvoiceShow },
  { path: '/items', component: ItemList },
  { path: '/banks', component: BankList },
  { path: '/banks/:id', component: BankShow },
  { path: '/payments', component: PaymentList },
  { path: '/payments/:id', component: PaymentShow },
  { path: '/projects', component: ProjectList },
  { path: '/projects/:id', component: ProjectShow },
  { path: '/rates', component: RateList },
  { path: '/refunds', component: RefundList },
  { path: '/refunds/:id', component: RefundShow },
  { path: '/reimbursements/:id', component: ReimbursementShow },
  { path: '/reports', component: ReportList },
  { path: '/tax', component: TaxList },
  { path: '/receipts/:id', component: ReceiptShow },
  { path: '/reports/revenue', component: RevenueReport },
  { path: '/trips/:id', component: TripShow },
  { path: '/vendors', component: VendorList },
  { path: '/vendors/:id', component: VendorShow }
]

export default routes
