const WorkflowSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  program: program(result.related('program')),
  config: result.get('config'),
  status: result.get('status'),
  enrolled: 123,
  active: 234,
  lost: 345,
  converted: 456,
  completed: 567,
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

export default WorkflowSerializer
