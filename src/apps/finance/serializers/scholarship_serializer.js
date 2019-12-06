const ScholarshipSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  balance: result.get('balance'),
  description: result.get('description'),
  program: program(result.related('program')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}
export default ScholarshipSerializer
