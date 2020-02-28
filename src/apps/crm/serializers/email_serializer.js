const EmailSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  title: result.get('title'),
  config: result.get('config'),
  program: program(result.related('program')),
  results: results(result.related('results')),
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

const results = (results) => {
  if(!results) return null
  return {
    sent: results.get('sent'),
    delivered: results.get('delivered'),
    bounced: results.get('bounced'),
    opened: results.get('opened'),
    total_opened: results.get('total_opened'),
    last_opened_at: results.get('last_opened_at'),
    mobile: results.get('mobile'),
    desktop: results.get('desktop'),
    clicked: results.get('clicked'),
    total_clicked: results.get('total_clicked'),
    forwarded: results.get('forwarded'),
    shared: results.get('shared'),
    webviewed: results.get('webviewed'),
    complained: results.get('complained'),
    unsubscribed: results.get('unsubscribed')
  }
}

export default EmailSerializer
