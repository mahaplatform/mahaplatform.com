const OrganizationSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  logo: result.related('logo') ? result.related('logo').get('path') : null,
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default OrganizationSerializer
