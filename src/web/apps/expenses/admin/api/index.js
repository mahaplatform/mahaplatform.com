import { Segment } from '../../../../core/backframe'
import advances from './items/advances'
import checks from './items/checks'
import expenses from './items/expenses'
import items from './items/items'
import itemApprovals from './items/approvals'
import itemReport from './items/report'
import reimbursements from './items/reimbursements'
import trips from './items/trips'

const api = new Segment({
  routes: [
    advances,
    checks,
    expenses,
    items,
    itemApprovals,
    itemReport,
    reimbursements,
    trips
  ]
})

export default api
