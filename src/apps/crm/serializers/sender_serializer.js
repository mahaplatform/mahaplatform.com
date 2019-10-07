const SenderSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  email: result.get('email'),
  rfc822: result.get('rfc822'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default SenderSerializer
