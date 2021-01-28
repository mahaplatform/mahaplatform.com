const CallSerializer = (req, result) => ({
  id: result.get('id'),
  sid: result.get('sid'),
  to: number(result.related('to')),
  from: number(result.related('from')),
  program: program(result.related('program')),
  contact: contact(result.related('phone_number').related('contact')),
  direction: result.get('direction'),
  status: result.get('status'),
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



export default CallSerializer
