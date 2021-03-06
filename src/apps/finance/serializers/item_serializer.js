const expenseSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  item_id: result.get('item_id'),
  type: result.get('type'),
  date: result.get('date'),
  description: result.get('description'),
  expense_type: expense_type(result.related('expense_type')),
  project: project(result.related('project')),
  tax_project: project(result.related('tax_project')),
  vendor: vendor(result.related('vendor')),
  user: user(result.related('user')),
  amount: result.get('amount'),
  tax: result.get('tax'),
  status: result.get('status'),
  account: account(result.related('account')),
  time_leaving: result.get('time_leaving'),
  time_arriving: result.get('time_arriving'),
  odometer_start: result.get('odometer_start'),
  odometer_end: result.get('odometer_end'),
  total_miles: result.get('total_miles'),
  deleted_at: result.get('created_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    account_id: user.get('account_id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

const expense_type = (expense_type) => {
  if(!expense_type.get('id')) return null
  return {
    id: expense_type.get('id'),
    title: expense_type.get('title'),
    description: expense_type.get('description'),
    full_title: expense_type.get('full_title'),
    integration: expense_type.get('integration')
  }
}

const project = (project) => {
  if(!project.get('id')) return null
  return {
    id: project.get('id'),
    title: project.get('title'),
    full_title: project.get('full_title'),
    integration: project.get('integration')
  }
}

const vendor = (vendor) => {
  if(!vendor.get('id')) return null
  return {
    id: vendor.get('id'),
    name: vendor.get('name'),
    integration: vendor.get('integration')
  }
}

const account = (account) => {
  if(!account.get('id')) return null
  return {
    id: account.get('id'),
    name: account.get('name')
  }
}

export default expenseSerializer
