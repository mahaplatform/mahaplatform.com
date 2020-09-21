const teamSerializer = (req, result) => ({
  title: result.get('title'),
  address: result.get('address'),
  subdomain: result.get('subdomain'),
  logo: result.related('logo').get('path')
})

export default teamSerializer
