const emailSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  user: user(result.related('user')),
  code: result.get('code'),
  from: result.get('from'),
  to: result.get('to'),
  cc: result.get('cc'),
  bcc: result.get('bcc'),
  subject: result.get('subject'),
  html: result.get('html'),
  status: result.get('status'),
  activities: result.related('activities').map(activity),
  was_delivered: result.get('was_delivered'),
  was_opened: result.get('was_opened'),
  sent_at: result.get('sent_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const activity = (activity) => ({
  id: activity.get('id'),
  type: activity.get('type'),
  description: activity.get('description'),
  icon: activity.get('icon'),
  service: activity.get('service'),
  link: link(activity.related('link')),
  forwarded_to: link(activity.related('forwarded_to')),
  created_at: activity.get('created_at')
})

const contact = (contact) => {
  if(!contact) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    rfc822: contact.get('rfc822'),
    email: contact.get('email'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

const link = (link) => {
  if(!link) return null
  return {
    id: link.get('id'),
    text: link.get('text'),
    url: link.get('url')
  }
}

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    account_id: user.get('account_id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default emailSerializer
