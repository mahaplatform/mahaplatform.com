const ResponseSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default ResponseSerializer
