const teamSerializer = (req, result) => ({
  id: result.get('id'),
  app_ids: result.get('app_ids'),
  title: result.get('title'),
  subdomain: result.get('subdomain'),
  logo: result.related('logo').get('path'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default teamSerializer
