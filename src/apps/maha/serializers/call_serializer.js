const CallSerializer = (req, result) => ({
  id: result.get('id'),
  sid: result.get('sid'),
  to_number: number(result.related('to_number')),
  from_number: number(result.related('from_number')),
  program: program(result.related('program')),
  phone_number: number(result.related('phone_number')),
  contact: contact(result.related('phone_number').related('contact')),
  direction: result.get('direction'),
  duration: result.get('duration'),
  status: result.get('status'),
  price: result.get('price'),
  connections: result.related('connections').map(connection),
  started_at: result.get('started_at'),
  ended_at: result.get('ended_at'),
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

const connection = (connection) => {
  if(!connection.id) return
  return {
    id: connection.get('id'),
    sid: connection.get('sid'),
    activities: connection.related('activities').map(activity)
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

export default CallSerializer
