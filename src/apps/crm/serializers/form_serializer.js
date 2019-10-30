const FormSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  config: result.get('config'),
  program: program(result.related('program')),
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

export default FormSerializer
