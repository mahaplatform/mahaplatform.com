const domainSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  type: result.get('type'),
  status: result.get('status'),
  registration_status: result.get('registration_status'),
  registrant_status: result.get('registrant_status'),
  transfer_status: result.get('transfer_status'),
  dns_status: result.get('dns_status'),
  expires_at: result.get('expires_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default domainSerializer
