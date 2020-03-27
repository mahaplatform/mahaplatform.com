const SessionSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  location: location(result.related('location')),
  date: result.get('date'),
  start_time: result.get('start_time'),
  end_time: result.get('end_time'),
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
