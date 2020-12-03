const domainSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  duration: result.get('duration'),
  auto_renew: result.get('auto_renew'),
  manage_dns: result.get('manage_dns'),
  type: result.get('type'),
  registration_status: result.get('registration_status'),
  dns_status: result.get('dns_status'),
  hosting_status: result.get('hosting_status'),
  admin_contact: result.get('admin_contact'),
  registrant_contact: result.get('registrant_contact'),
  tech_contact: result.get('tech_contact'),
  zone: result.get('zone'),
  expires_on: result.get('created_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default domainSerializer
