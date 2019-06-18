const projectSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  is_active: result.get('is_active'),
  integration: integration(req, result),
  audit: result.related('audit').map(entry => audit(entry)),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const audit = (entry) => ({
  id: entry.get('id'),
  user: user(entry, 'user'),
  story: entry.related('story').get('text'),
  created_at: entry.get('created_at'),
  updated_at: entry.get('updated_at')
})

const user = (result, key) => {

  if(!result.related(key)) return null

  return {
    id: result.related(key).get('id'),
    full_name: result.related(key).get('full_name'),
    initials: result.related(key).get('initials'),
    photo: result.related(key).related('photo') ? result.related(key).related('photo').get('path') : null
  }

}

const integration = (req, result) => {
  const integration = req.apps.expenses.settings.integration
  if(integration === '' || integration === null) return null
  return result.get('integration')
}

export default projectSerializer
