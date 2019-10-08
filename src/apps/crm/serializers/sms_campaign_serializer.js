const SMSCampaignSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  number: number(result.related('number')),
  code: result.get('code'),
  status: result.get('status'),
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

const number = (number) => {
  if(!number.id) return
  return {
    id: number.get('id'),
    number: number.get('number'),
    locality: number.get('locality'),
    region: number.get('region')
  }
}

export default SMSCampaignSerializer
