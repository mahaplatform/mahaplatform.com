const EmailSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  title: result.get('title'),
  config: result.get('config'),
  sent: 162,
  delivered: 162,
  opened: 121,
  complained: 0,
  clicked: 53,
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default EmailSerializer
