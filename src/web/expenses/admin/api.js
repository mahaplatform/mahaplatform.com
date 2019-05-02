import { Segment } from 'maha'
import accounts from './api/accounts'
import advances from './api/items/advances'
import batches from './api/batches'
import checks from './api/items/checks'
import expenses from './api/items/expenses'
import expenseTypes from './api/expense_types'
import expenseTypesActive from './api/expense_types/active'
import items from './api/items/items'
import itemApprovals from './api/items/approvals'
import itemReport from './api/items/report'
import memberships from './api/memberships'
import projects from './api/projects'
import rates from './api/rates'
import receipts from './api/receipts'
import reimbursements from './api/items/reimbursements'
import statuses from './api/statuses'
import trips from './api/items/trips'
import vendors from './api/vendors'
import projectMemberships from './api/project_memberships'
import userMemberships from './api/user_memberships'
import userProjects from './api/user_projects'

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
