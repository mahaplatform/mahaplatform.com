const ContactSerializer = (req, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  phone: result.get('phone'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  values: values(req, result.get('values')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const values = (req, values) => Object.keys(values).reduce((sanitized, code) => {
  const field = req.fields.find(field => field.get('code') === code)
  const { multiple } = field.get('config')
  return {
    ...sanitized,
    [code]: multiple === true ? values[code] : values[code][0]
  }
}, {})

export default ContactSerializer
