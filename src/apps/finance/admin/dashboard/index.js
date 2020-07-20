const dashboard = [
  {
    code: 'admin_overview',
    title: 'Finance Overview',
    description: 'Activity overview for Finance staff',
    rights: ['finance:manage_revenue', 'finance:manage_deposits', 'finance:export_expenses', 'finance:review_expenses']
  }, {
    code: 'new_item',
    title: 'New Expense',
    description: 'Submit a new expense'
  }, {
    code: 'expense_approvals',
    title: 'Expense Approvals',
    description: 'Summary of finance items to approve'
  }
]

export default dashboard
