const WorkflowSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  display_name: result.get('display_name'),
  code: result.get('code'),
  program: program(result.related('program')),
  email: email(result.related('email')),
  event: event(result.related('event')),
  form: form(result.related('form')),
  list: list(result.related('list')),
  topic: topic(result.related('topic')),
  status: result.get('status'),
  steps: result.related('steps').map(step),
  trigger_type: result.get('trigger_type'),
  action: result.get('action'),
  enrolled_count: result.get('enrolled_count'),
  active_count: result.get('active_count'),
  lost_count: result.get('lost_count'),
  converted_count: result.get('converted_count'),
  completed_count: result.get('completed_count'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const email = (email) => {
  if(!email.id) return
  return {
    id: email.get('id'),
    title: email.get('title')
  }
}

const event = (event) => {
  if(!event.id) return
  return {
    id: event.get('id'),
    title: event.get('title'),
    contact_config: event.get('contact_config')
  }
}

const form = (form) => {
  if(!form.id) return
  return {
    id: form.get('id'),
    config: form.get('config'),
    title: form.get('title')
  }
}

const list = (list) => {
  if(!list.id) return
  return {
    id: list.get('id'),
    title: list.get('title')
  }
}

const topic = (topic) => {
  if(!topic.id) return
  return {
    id: topic.get('id'),
    title: topic.get('title')
  }
}

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null,
    phone_number: phone_number(program.related('phone_number'))
  }
}

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
