const LocationSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  address: result.get('address'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default LocationSerializer
