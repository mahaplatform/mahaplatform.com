const ContactSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  display_name: result.get('display_name'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  phone: result.get('phone'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  lists: result.related('lists').map(list),
  organizations: result.related('organizations').map(organization),
  tags: result.related('tags').map(tag),
  values: values(req, result.get('values')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const list = (list) => {
  if(!list.id) return null
  return {
    id: list.get('id'),
    name: list.get('name')
  }
}

const organization = (organization) => {
  if(!organization.id) return null
  return {
    id: organization.get('id'),
    name: organization.get('name')
  }
}

const tag = (tag) => {
  if(!tag.id) return null
  return {
    id: tag.get('id'),
    text: tag.get('text')
  }
}

const values = (req, values) => Object.keys(values).reduce((sanitized, code) => {
  const field = req.fields.find(field => field.get('code') === code)
  const { multiple } = field.get('config')
  return {
    ...sanitized,
    [code]: multiple === true ? values[code] : values[code][0]
  }
}, {})

export default ContactSerializer
