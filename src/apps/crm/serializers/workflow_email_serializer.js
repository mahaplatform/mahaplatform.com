const EmailSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  title: result.get('title'),
  config: result.get('config'),
  sender: sender(result.related('sender')),
  subject: result.get('subject'),
  sent: 162,
  delivered: 162,
  opened: 121,
  complained: 0,
  clicked: 53,
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const sender = (sender) => {
  if(!sender.id) return
  return {
    id: sender.get('id'),
    name: sender.get('name'),
    email: sender.get('email'),
    rfc822: sender.get('rfc822')
  }
}

export default EmailSerializer
