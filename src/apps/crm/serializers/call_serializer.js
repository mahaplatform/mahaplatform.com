const CallSerializer = (req, result) => ({
  id: result.get('id'),
  direction: result.get('direction'),
  duration: result.get('duration'),
  contact: {
    id: result.related('phone_number').related('contact').get('id'),
    full_name: result.related('phone_number').related('contact').get('full_name'),
    initials: result.related('phone_number').related('contact').get('initials'),
    photo: result.related('phone_number').related('contact').related('photo') ? result.related('phone_number').related('contact').related('photo').get('path') : null
  },
  user: result.get('user_id') ? {
    id: result.related('user').get('id'),
    full_name: result.related('user').get('full_name'),
    initials: result.related('user').get('initials'),
    photo: result.related('user').related('photo') ? result.related('user').related('photo').get('path') : null
  } : null,
  program: {
    id: result.related('program').get('id'),
    title: result.related('program').get('title'),
    logo: result.related('program').related('logo') ? result.related('program').related('logo').get('path') : null
  },
  from: {
    id: result.related('from').get('id'),
    number: result.related('from').get('formatted')
  },
  to: {
    id: result.related('to').get('id'),
    number: result.related('to').get('formatted')
  },
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default CallSerializer
