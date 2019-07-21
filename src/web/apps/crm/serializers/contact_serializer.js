const ContactSerializer = (req, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  phone: result.get('phone'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default ContactSerializer
