const LocationSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  email: result.get('email'),
  phone: result.get('phone'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default LocationSerializer
