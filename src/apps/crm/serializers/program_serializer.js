const ProgramSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  logo: result.related('logo') ? result.related('logo').get('path') : null,
  phone_number: phone_number(result.related('phone_number')),
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
