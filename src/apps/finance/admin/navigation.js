import { isOwnerOrAdmin, canApprove } from './utils/access'

const navigation = async (req) => ({
  items: [
    { label: 'Expenses', rights: ['finance:manage_expenses'], items: [
      { label: 'Accounts', rights: ['finance:manage_configuration'], route: '/accounts'},
      { label: 'Approvals', access: canApprove, route: '/approvals'},
      { label: 'Batches', rights: ['finance:manage_configuration'], route: '/batches'},
      { label: 'Items', route: '/items' },
      { label: 'Rates', rights: ['finance:manage_configuration'], route: '/rates' },
      { label: 'Report', access: isOwnerOrAdmin, route: '/reports' },
      { label: 'Taxes', rights: ['finance:manage_configuration'], route: '/tax' },
      { label: 'Vendors', rights: ['finance:manage_configuration'], route: '/vendors' }
    ] },
    { label: 'Revenue', rights: ['finance:manage_revenue'], items: [
      { label: 'Bank Accounts', route: '/banks' },
      { label: 'Customers', route: '/customers' },
      { label: 'Invoices', route: '/invoices' },
      { label: 'Deposits', route: '/deposits' },
      { label: 'Payments', route: '/payments' },
      { label: 'Report', route: '/reports/revenue' }
    ] },
    { label: 'Projects', route: '/projects' }
  ]
})

export default navigation
