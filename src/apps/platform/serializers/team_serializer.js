const teamSerializer = (req, result) => ({
  id: result.get('id'),
  is_active: result.get('is_active'),
  app_ids: result.get('app_ids'),
  title: result.get('title'),
  subdomain: result.get('subdomain'),
  logo: result.related('logo').get('path'),
  storage: result.get('storage'),
  users_count: result.get('users_count'),
  phone_numbers_count: result.get('phone_numbers_count'),
  smses_count: result.get('smses_count'),
  calls_count: result.get('calls_count'),
  emails_count: result.get('emails_count'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default teamSerializer
