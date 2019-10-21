const SMSCampaignSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  phone_number: phone_number(result.related('phone_number')),
  code: result.get('code'),
  direction: result.get('direction'),
  steps: result.get('steps'),
  status: result.get('status'),
  term: result.get('term'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title')
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

export default SMSCampaignSerializer
