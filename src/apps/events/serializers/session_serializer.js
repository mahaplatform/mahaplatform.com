const SessionSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  description: result.get('description'),
  location: location(result.related('location')),
  is_online: result.get('is_online'),
  starts_at: result.get('starts_at'),
  ends_at: result.get('ends_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const location = (location) => {
  if(!location.id) return
  return {
    id: location.get('id'),
    name: location.get('name'),
    address: location.get('address')
  }
}

export default SessionSerializer
