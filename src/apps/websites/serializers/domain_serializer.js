const domainSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  type: result.get('type'),
  status: result.get('status'),
  registration_status: result.get('registration_status'),
  transfer_status: result.get('transfer_status'),
  dns_status: result.get('dns_status'),
  is_locked: result.get('is_locked'),
  auth_code: result.get('auth_code'),
  auto_renew: result.get('auto_renew'),
  expires_at: result.get('expires_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default domainSerializer
