const CallSerializer = (req, result) => ({
  id: result.get('id'),
  sid: result.get('sid'),
  direction: result.get('direction'),
  duration: result.get('duration'),
  phone_number: number(result.related('phone_number')),
  contact: contact(result.related('phone_number').related('contact')),
  user: result.get('user_id') ? user(result.related('user')) : null,
  program: program(result.related('program')),
  from: number(result.related('from')),
  to: number(result.related('to')),
  voice_campaign: voice_campaign(result.related('enrollment')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact.id) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    full_name: contact.get('full_name'),
    initials: contact.get('initials'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null,
    phone_number: number(program.related('phone_number'))
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

const number = (number) => {
  if(!number.id) return null
  return {
    id: number.get('id'),
    number: number.get('number'),
    formatted: number.get('formatted')
  }
}

const voice_campaign = (enrollment) => {
  if(!enrollment.id) return null
  const voice_campaign = enrollment.related('voice_campaign')
  return {
    id: voice_campaign.get('id'),
    direction: voice_campaign.get('direction'),
    title: voice_campaign.get('title')
  }
}

export default CallSerializer
