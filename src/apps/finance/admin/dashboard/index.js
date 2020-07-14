const dashboard = [
  {
    code: 'admin_tasks',
    title: 'Finance Overview',
    description: 'Activity overview for Finance staff',
    rights: ['finance:access_expense_reports','finance:manage_revenue']
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
