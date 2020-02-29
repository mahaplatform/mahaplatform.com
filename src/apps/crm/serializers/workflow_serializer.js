const WorkflowSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  program: program(result.related('program')),
  form: form(result.related('form')),
  status: result.get('status'),
  steps: result.related('steps').map(step),
  enrolled: 123,
  active: 234,
  lost: 345,
  converted: 456,
  completed: 567,
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const form = (form) => {
  if(!form.id) return
  return {
    id: form.get('id'),
    config: form.get('config'),
    title: form.get('title')
  }
}

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

const step = (step) => {
  if(!step.id) return
  return {
    id: step.get('id'),
    type: step.get('type'),
    action: step.get('action'),
    code: step.get('code'),
    delta: step.get('delta'),
    parent: step.get('parent'),
    answer: step.get('answer'),
    config: step.get('config')
  }
}

export default WorkflowSerializer
