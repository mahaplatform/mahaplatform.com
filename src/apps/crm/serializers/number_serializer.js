const NumberSerializer = (req, result) => ({
  id: result.get('id'),
  number: result.get('number'),
  program: program(result.related('program')),
  locality: result.get('locality'),
  region: result.get('region'),
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

export default NumberSerializer
