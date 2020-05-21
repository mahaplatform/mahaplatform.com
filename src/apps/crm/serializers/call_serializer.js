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
  from: number(result.related('from')),
  to: number(result.related('to')),
  voice_campaign: voice_campaign(result.related('enrollment')),
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
