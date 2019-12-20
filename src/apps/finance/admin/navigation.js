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
      { label: 'Coupons', route: '/coupons' },
      { label: 'Customers', route: '/customers' },
      { label: 'Customer Invoices', route: '/invoices' },
      { label: 'Disbursements', route: '/disbursements' },
      { label: 'Merchant Accounts', route: '/merchants' },
      { label: 'Payments', route: '/payments' },
      { label: 'Products', route: '/products' },
      { label: 'Revenue Types', route: '/revenue_types' },
      { label: 'Reports', items: [
        { label: 'Donation', route: '/reports/donation' },
        { label: 'Revenue', route: '/reports/revenue' }
      ] }
    ] },
    { label: 'Projects', route: '/projects' }
  ]
})

export default navigation
