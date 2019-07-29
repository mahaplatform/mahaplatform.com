import { canApprove, isOwnerOrAdmin } from './utils/access'

const navigation = async (req) => ({
  items: [
    { label: 'Administration', rights: ['expenses:manage_configuration'], items: [
      { label: 'Accounts', route: '/accounts'},
      { label: 'Batches', route: '/batches'},
      { label: 'Expense Types', route: '/expense_types' },
      { label: 'Rates', route: '/rates' },
      { label: 'Taxes', rights: ['expenses:manage_configuration'], route: '/tax' },
      { label: 'Vendors', route: '/vendors' }
    ] },
    { label: 'Approvals', rights: ['expenses:manage_expenses'], access: canApprove, route: '/approvals'},
    { label: 'Items', rights: ['expenses:manage_expenses'], route: '/items' },
    { label: 'Projects', rights: ['expenses:manage_expenses'], route: '/projects' },
    { label: 'Report', rights: ['expenses:manage_configuration'], route: '/reports' }
  ]
})

export default navigation
