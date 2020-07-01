import { isOwnerOrAdmin, canApprove } from './utils/access'

const navigation = async (req) => ({
  items: [
    { label: 'Expenses', rights: ['finance:manage_expenses'], items: [
      { label: 'Accounts', rights: ['finance:manage_configuration'], route: '/accounts'},
      { label: 'Approvals', access: canApprove, route: '/approvals'},
      { label: 'Batches', rights: ['finance:manage_configuration'], route: '/batches'},
      { label: 'Expense Types', rights: ['finance:manage_configuration'], route: '/expense_types' },
      { label: 'Items', route: '/items' },
      { label: 'Rates', rights: ['finance:manage_configuration'], route: '/rates' },
      { label: 'Report', access: isOwnerOrAdmin, route: '/reports' },
      { label: 'Taxes', rights: ['finance:manage_configuration'], route: '/tax' },
      { label: 'Vendors', rights: ['finance:manage_configuration'], route: '/vendors' }
    ] },
    { label: 'Revenue', rights: ['finance:manage_revenue'], items: [
      { label: 'Banks', route: '/merchants' },
      { label: 'Coupons', route: '/coupons' },
      { label: 'Customers', route: '/customers' },
      { label: 'Customer Invoices', route: '/invoices' },
      { label: 'Deposits', route: '/deposits' },
      { label: 'Payments', route: '/payments' },
      { label: 'Products', route: '/products' },
      { label: 'Report', route: '/reports/revenue' },
      { label: 'Revenue Types', route: '/revenue_types' }
    ] },
    { label: 'Projects', route: '/projects' }
  ]
})

export default navigation
