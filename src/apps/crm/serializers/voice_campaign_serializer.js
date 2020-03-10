const VoiceCampaignSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  phone_number: phone_number(result.related('phone_number')),
  to: result.get('to'),
  recipients: result.get('recipients'),
  code: result.get('code'),
  purpose: result.get('purpose'),
  direction: result.get('direction'),
  status: result.get('status'),
  steps: result.related('steps').map(step),
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

export default VoiceCampaignSerializer
