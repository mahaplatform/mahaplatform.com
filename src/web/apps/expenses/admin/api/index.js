import { Segment } from '../../../../core/backframe'
import accounts from './accounts'
import advances from './items/advances'
import batches from './batches'
import checks from './items/checks'
import expenses from './items/expenses'
import expenseTypes from './expense_types'
import expenseTypesActive from './expense_types/active'
import items from './items/items'
import itemApprovals from './items/approvals'
import itemReport from './items/report'
import memberships from './memberships'
import projects from './projects'
import rates from './rates'
import receipts from './receipts'
import reimbursements from './items/reimbursements'
import statuses from './statuses'
import trips from './items/trips'
import vendors from './vendors'
import projectMemberships from './project_memberships'
import userMemberships from './user_memberships'
import userProjects from './user_projects'

const api = new Segment({
  routes: [
    accounts,
    advances,
    batches,
    checks,
    expenses,
    expenseTypesActive,
    expenseTypes,
    items,
    itemApprovals,
    itemReport,
    memberships,
    projects,
    rates,
    receipts,
    reimbursements,
    statuses,
    trips,
    vendors,
    projectMemberships,
    userMemberships,
    userProjects
  ]
})

export default api
