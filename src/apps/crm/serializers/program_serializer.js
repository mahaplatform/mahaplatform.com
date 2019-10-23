const ProgramSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  logo: result.related('logo') ? result.related('logo').get('path') : null,
  phone_number: phone_number(result.related('phone_number')),
  has_email_channel: result.get('has_email_channel'),
  has_sms_channel: result.get('has_sms_channel'),
  has_voice_channel: result.get('has_voice_channel'),
  has_mail_channel: result.get('has_mail_channel'),
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
export default ProgramSerializer
