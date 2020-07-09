import { isOwnerOrAdmin, canApprove } from './utils/access'

const navigation = async (req) => ({
  items: [
    { label: 'Expenses', items: [
      { label: 'Accounts', rights: ['finance:manage_configuration'], route: '/accounts'},
      { label: 'Approvals', rights: ['finance:approve_expenses'], access: canApprove, route: '/approvals'},
      { label: 'Batches', rights: ['finance:export_expenses'], route: '/batches'},
      { label: 'Items', rights: ['finance:manage_expense'], route: '/items' },
      { label: 'Report', rights: ['finance:access_reports'], access: isOwnerOrAdmin, route: '/reports' },
      { label: 'Taxes', rights: ['finance:access_reports'], route: '/tax' },
      { label: 'Vendors', rights: ['finance:manage_configuration'], route: '/vendors' }
    ] },
    { label: 'Revenue', items: [
      { label: 'Bank Accounts', rights: ['finance:manage_banks'], route: '/banks' },
      { label: 'Customers', rights: ['finance:manage_revenue'], route: '/customers' },
      { label: 'Invoices', rights: ['finance:manage_revenue'], route: '/invoices' },
      { label: 'Deposits', rights: ['finance:manage_deposits'], route: '/deposits' },
      { label: 'Payments', rights: ['finance:manage_revenue'], route: '/payments' },
      { label: 'Report', rights: ['finance:access_reports'], route: '/reports/revenue' }
    ] },
    { label: 'Projects', route: '/projects' }
  ]
})

export default navigation
