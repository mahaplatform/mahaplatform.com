import { isOwnerOrAdmin, canApprove } from './utils/access'

const navigation = async (req) => ({
  items: [
    { label: 'Expenses', rights: ['finance:manage_expenses'], items: [
      { label: 'Accounts', route: '/accounts'},
      { label: 'Approvals', access: canApprove, route: '/approvals'},
      { label: 'Batches', route: '/batches'},
      { label: 'Expense Types', route: '/expense_types' },
      { label: 'Items', route: '/items' },
      { label: 'Rates', route: '/rates' },
      { label: 'Report', access: isOwnerOrAdmin, route: '/reports' },
      { label: 'Taxes', rights: ['finance:manage_configuration'], route: '/tax' },
      { label: 'Vendors', route: '/vendors' }
    ] },
    { label: 'Revenue', rights: ['finance:manage_revenue'], items: [
      { label: 'Coupons', route: '/coupons' },
      { label: 'Customers', route: '/customers' },
      { label: 'Invoices', route: '/invoices' },
      { label: 'Payments', route: '/payments' },
      { label: 'Products', route: '/products' },
      { label: 'Refunds', route: '/refunds' },
      { label: 'Revenue Types', route: '/revenue_types' }
    ] },
    { label: 'Projects', route: '/projects' }
  ]
})

export default navigation
