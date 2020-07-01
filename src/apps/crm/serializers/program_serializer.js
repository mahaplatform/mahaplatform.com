const ProgramSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  address: result.get('address'),
  logo: result.related('logo') ? result.related('logo').get('path') : null,
  bank: bank(result.related('bank')),
  phone_number: phone_number(result.related('phone_number')),
  voice_campaign: campaign(result.related('voice_campaign')),
  access_type: result.get('access_type'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const phone_number = (phone_number) => {
  if(!phone_number.id) return null
  return {
    id: phone_number.get('id'),
    number: phone_number.get('number'),
    formatted: phone_number.get('formatted'),
    locality: phone_number.get('locality'),
    region: phone_number.get('region')
  }
}

const campaign = (campaign) => {
  if(!campaign.id) return null
  return {
    id: campaign.get('id'),
    title: campaign.get('title')
  }
}

const bank = (bank) => {
  if(!bank.id) return null
  return {
    id: bank.get('id'),
    title: bank.get('title')
  }
}

export default ProgramSerializer
