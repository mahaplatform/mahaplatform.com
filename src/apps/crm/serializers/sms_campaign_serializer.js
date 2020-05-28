const SMSCampaignSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  phone_number: phone_number(result.related('phone_number')),
  to: result.get('to'),
  recipients: result.get('recipients'),
  code: result.get('code'),
  purpose: result.get('purpose'),
  type: 'sms',
  direction: result.get('direction'),
  status: result.get('status'),
  steps: result.related('steps').map(step),
  term: result.get('term'),
  sessions_count: result.get('sessions_count'),
  active_count: result.get('active_count'),
  lost_count: result.get('lost_count'),
  converted_count: result.get('converted_count'),
  completed_count: result.get('completed_count'),
  send_at: result.get('send_at'),
  sent_at: result.get('sent_at'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null,
    phone_number: phone_number(program.related('phone_number'))
  }
}

const phone_number = (phone_number) => {
  if(!phone_number.id) return
  return {
    id: phone_number.get('id'),
    number: phone_number.get('number'),
    formatted: phone_number.get('formatted'),
    locality: phone_number.get('locality'),
    region: phone_number.get('region')
  }
}

const step = (step) => {
  if(!step.id) return
  return {
    id: step.get('id'),
    type: step.get('type'),
    action: step.get('action'),
    code: step.get('code'),
    delta: step.get('delta'),
    parent: step.get('parent'),
    answer: step.get('answer'),
    config: step.get('config')
  }
}

export default SMSCampaignSerializer
