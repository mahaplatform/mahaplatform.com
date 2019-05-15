import { Segment } from '../../../../core/backframe'
import advances from './items/advances'
import batches from './batches'
import checks from './items/checks'
import expenses from './items/expenses'
import expenseTypes from './expense_types'
import expenseTypesActive from './expense_types/active'
import items from './items/items'
import itemApprovals from './items/approvals'
import itemReport from './items/report'
import rates from './rates'
import receipts from './receipts'
import reimbursements from './items/reimbursements'
import statuses from './statuses'
import trips from './items/trips'
import vendors from './vendors'

const api = new Segment({
  routes: [
    advances,
    batches,
    checks,
    expenses,
    expenseTypesActive,
    expenseTypes,
    items,
    itemApprovals,
    itemReport,
    rates,
    receipts,
    reimbursements,
    statuses,
    trips,
    vendors
  ]
})

export default api
