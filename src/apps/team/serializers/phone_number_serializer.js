const NumberSerializer = (req, result) => ({
  id: result.get('id'),
  type: result.get('type'),
  number: result.get('number'),
  formatted: result.get('formatted'),
  locality: result.get('locality'),
  region: result.get('region'),
  program: program(result.related('program')),
  voice_campaign: voice_campaign(result.related('voice_campaign')),
  released_at: result.get('released_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

const voice_campaign = (voice_campaign) => {
  if(!voice_campaign.id) return
  return {
    id: voice_campaign.get('id'),
    code: voice_campaign.get('code')
  }
}

export default NumberSerializer
