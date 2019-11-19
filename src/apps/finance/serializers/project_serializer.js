const projectSerializer = (req, result) => ({
  id: result.get('id'),
  display: result.get('display'),
  title: result.get('title'),
  type: result.get('type'),
  is_active: result.get('is_active'),
  tax_project: tax_project(req, result.related('tax_project')),
  integration: integration(req, result),
  audit: result.related('audit').map(audit),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const tax_project = (req, tax_project) => {
  if(!tax_project.id) return null
  return {
    id: tax_project.get('id'),
    title: tax_project.get('title'),
    integration: integration(req, tax_project)
  }
}

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
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

const integration = (req, result) => {
  const integration = req.apps.finance.settings.integration
  if(integration === '' || integration === null) return null
  return result.get('integration')
}

export default projectSerializer
