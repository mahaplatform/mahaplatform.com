const SenderSerializer = (req, result) => ({
  id: result.get('id'),
  program: program(result.related('program')),
  name: result.get('name'),
  email: result.get('email'),
  rfc822: result.get('rfc822'),
  is_verified: result.get('is_verified'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

export default SenderSerializer
