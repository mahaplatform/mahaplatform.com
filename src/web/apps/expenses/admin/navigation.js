import { canApprove, isOwnerOrAdmin } from './utils/access'

const navigation = async (req) => ({
  items: [
    { label: 'Administration', rights: ['expenses:manage_configuration'], items: [
      { label: 'Accounts', route: '/accounts'},
      { label: 'Batches', route: '/batches'},
      { label: 'Expense Types', route: '/expense_types' },
      { label: 'Rates', route: '/rates' },
      { label: 'Vendors', route: '/vendors' }

    ] },
    { label: 'Approvals', rights: ['expenses:manage_expenses'], access: canApprove, route: '/approvals'},
    { label: 'Items', rights: ['expenses:manage_expenses'], route: '/items' },
    { label: 'Projects', rights: ['expenses:manage_expenses'], route: '/projects' },
    { label: 'Reports', rights: ['expenses:manage_configuration'], access: isOwnerOrAdmin, route: '/reports' }
  ]
})

export default navigation
