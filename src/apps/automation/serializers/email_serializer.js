const EmailSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  editable: result.get('editable'),
  title: result.get('title'),
  type: result.get('type'),
  display_name: result.get('display_name'),
  config: result.get('config'),
  event: event(result.related('event')),
  form: form(result.related('form')),
  program: program(result.related('program')),
  has_preview: result.get('has_preview'),
  preview: result.get('preview'),
  open_rate: result.get('open_rate'),
  bounce_rate: result.get('bounce_rate'),
  click_rate: result.get('click_rate'),
  complaint_rate: result.get('complaint_rate'),
  unsubscribe_rate: result.get('unsubscribe_rate'),
  sent: result.get('sent'),
  delivered: result.get('delivered'),
  bounced: result.get('bounced'),
  hard_bounced: result.get('hard_bounced'),
  soft_bounced: result.get('soft_bounced'),
  opened: result.get('opened'),
  total_opened: result.get('total_opened'),
  last_opened_at: result.get('last_opened_at'),
  mobile: result.get('mobile'),
  desktop: result.get('desktop'),
  clicked: result.get('clicked'),
  total_clicked: result.get('total_clicked'),
  forwarded: result.get('forwarded'),
  shared: result.get('shared'),
  webviewed: result.get('webviewed'),
  complained: result.get('complained'),
  unsubscribed: result.get('unsubscribed'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

const event = (event) => {
  if(!event.id) return
  return {
    id: event.get('id'),
    title: event.get('title'),
    contact_config: event.get('contact_config')
  }
}

const form = (form) => {
  if(!form.id) return
  return {
    id: form.get('id'),
    title: form.get('title'),
    config: form.get('config')
  }
}

export default EmailSerializer
