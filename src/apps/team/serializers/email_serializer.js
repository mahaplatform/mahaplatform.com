const emailSerializer = (req, result) => ({
  id: result.get('id'),
  user: user(result.related('user')),
  from: result.get('from'),
  to: result.get('to'),
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
  service: activity.get('service'),
  link: link(activity.related('link')),
  created_at: activity.get('created_at')
})

const link = (link) => {
  if(!link.id) return null
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
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default emailSerializer
