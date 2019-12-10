const teamSerializer = (req, result) => ({
  title: result.get('title'),
  address: result.get('address'),
  subdomain: result.get('subdomain'),
  authentication_strategy: result.get('authentication_strategy'),
  logo: result.related('logo').get('path')
})

export default teamSerializer
