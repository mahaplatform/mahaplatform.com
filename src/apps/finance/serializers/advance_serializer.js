const advanceSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  date_needed: result.get('date_needed'),
  description: result.get('description'),
  expense_type: expense_type(result.related('expense_type')),
  project: project(result.related('project')),
  approver_ids: result.get('approver_ids'),
  user: user(result.related('user')),
  amount: result.get('amount'),
  status: result.get('status'),
  audit: result.related('audit').map(audit),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const audit = (entry) => ({
  id: entry.get('id'),
  user: user(entry.related('user')),
  story: entry.related('story').get('text'),
  created_at: entry.get('created_at'),
  updated_at: entry.get('updated_at')
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
    integration: expense_type.get('integration')
  }
}

const project = (project) => {
  if(!project.get('id')) return null
  return {
    id: project.get('id'),
    title: project.get('title'),
    integration: project.get('integration')
  }
}

export default advanceSerializer
