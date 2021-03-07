const CallConnectionSerializer = (req, result) => ({
  id: result.get('id'),
  sid: result.get('sid'),
  from_number: number(result.related('from_number')),
  to_number: number(result.related('to_number')),
  from_program: program(result.related('from_program')),
  to_program: program(result.related('to_program')),
  from_contact: contact(result.related('from_phone_number').related('contact')),
  to_contact: contact(result.related('to_phone_number').related('contact')),
  from_user: user(result.related('from_user')),
  to_user: user(result.related('to_user')),
  activities: result.related('activities').map(activity),
  direction: result.get('direction'),
  duration: result.get('duration'),
  status: result.get('status'),
  price: result.get('price'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const number = (number) => {
  if(!number.id) return null
  return {
    id: number.get('id'),
    number: number.get('number'),
    formatted: number.get('formatted')
  }
}

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    phone_number: number(program.related('phone_number')),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

const contact = (contact) => {
  if(!contact.id) return
  return {
    id: contact.get('id'),
    full_name: contact.get('full_name'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

const user = (user) => {
  if(!user.id) return
  return {
    id: user.get('id'),
    account_id: user.get('account_id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

const activity = (activity) => {
  if(!activity.id) return
  return {
    id: activity.get('id'),
    story: activity.related('story').get('text'),
    tstamp: activity.get('tstamp')
  }
}

export default CallConnectionSerializer
