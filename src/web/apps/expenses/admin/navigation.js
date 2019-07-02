import { canApprove, isOwnerOrAdmin } from './utils/access'

const navigation = async (req) => ({
  items: [
    { label: 'Accounts', rights: ['expenses:manage_configuration'], route: '/accounts'},
    { label: 'Approvals', rights: ['expenses:manage_expenses'], access: canApprove, route: '/approvals'},
    { label: 'Batches', rights: ['expenses:manage_configuration'], route: '/batches'},
    { label: 'Expense Types', rights: ['expenses:manage_configuration'], route: '/expense_types' },
    { label: 'Items', rights: ['expenses:manage_expenses'], route: '/items' },
    { label: 'Projects', rights: ['expenses:manage_expenses'], route: '/projects' },
    { label: 'Rates', rights: ['expenses:manage_expenses'], route: '/rates' },
    { label: 'Reports', rights: ['expenses:manage_expenses'], access: isOwnerOrAdmin, route: '/reports' },
    { label: 'Vendors', rights: ['expenses:manage_configuration'], route: '/vendors' }
  ]
})

export default navigation
