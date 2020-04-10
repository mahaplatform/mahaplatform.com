const AttendingSerializer = (req, result) => ({
  session: {
    id: result.get('id'),
    title: result.get('title'),
    location: location(result.related('location')),
    is_online: result.get('is_online'),
    date: result.get('date'),
    start_time: result.get('start_time'),
    end_time: result.get('end_time'),
    is_paid: result.get('is_paid'),
    created_at: result.get('created_at'),
    updated_at: result.get('updated_at')
  },
  is_checked: result.get('is_checked')
})

const location = (location) => {
  if(!location.id) return
  return {
    id: location.get('id'),
    name: location.get('name'),
    address: location.get('address')
  }
}

export default AttendingSerializer
