const FormSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  editable: result.get('editable'),
  permalink: result.get('permalink'),
  url: `${req.team.get('origin')}${result.get('path')}`,
  config: result.get('config'),
  program: program(result.related('program')),
  average_duration: result.get('average_duration'),
  respondents_count: result.get('respondents_count'),
  known_respondents_count: result.get('known_respondents_count'),
  unknown_respondents_count: result.get('unknown_respondents_count'),
  responses_count: result.get('responses_count'),
  revenue: result.get('revenue'),
  first_response: result.get('first_response'),
  last_response: result.get('last_response'),
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
    bank: bank(program.related('bank'))
  }
}

const bank = (bank) => {
  if(!bank.id) return
  return {
    id: bank.get('id'),
    title: bank.get('title'),
    status: bank.get('status')
  }
}
export default FormSerializer
