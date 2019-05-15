import { Segment } from '../../../../core/backframe'
import advances from './items/advances'
import checks from './items/checks'
import expenses from './items/expenses'
import expenseTypes from './expense_types'
import expenseTypesActive from './expense_types/active'
import items from './items/items'
import itemApprovals from './items/approvals'
import itemReport from './items/report'
import receipts from './receipts'
import reimbursements from './items/reimbursements'
import trips from './items/trips'
import vendors from './vendors'

const api = new Segment({
  routes: [
    advances,
    checks,
    expenses,
    expenseTypesActive,
    expenseTypes,
    items,
    itemApprovals,
    itemReport,
    receipts,
    reimbursements,
    trips,
    vendors
  ]
})

export default api
