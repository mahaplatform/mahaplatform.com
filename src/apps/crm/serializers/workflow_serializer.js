const WorkflowSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  program: program(result.related('program')),
  form: form(result.related('form')),
  status: result.get('status'),
  steps: result.related('steps').map(step),
  trigger_type: result.get('trigger_type'),
  enrolled: result.get('enrolled_count'),
  active: result.get('active_count'),
  lost: result.get('lost_count'),
  converted: result.get('converted_count'),
  completed: result.get('completed_count'),
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
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
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
