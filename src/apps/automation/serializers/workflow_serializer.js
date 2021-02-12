const WorkflowSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  display_name: result.get('display_name'),
  editable: result.get('editable'),
  code: result.get('code'),
  program: program(result.related('program')),
  email: email(result.related('email')),
  email_campaign: email_campaign(result.related('email_campaign')),
  event: event(result.related('event')),
  form: form(result.related('form')),
  list: list(result.related('list')),
  topic: topic(result.related('topic')),
  status: result.get('status'),
  store: store(result.related('store')),
  trigger_type: result.get('trigger_type'),
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

const email_campaign = (email_campaign) => {
  if(!email_campaign.id) return
  return {
    id: email_campaign.get('id'),
    title: email_campaign.get('title')
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

const store = (store) => {
  if(!store.id) return
  return {
    id: store.get('id'),
    title: store.get('title'),
    contact_config: store.get('contact_config')
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

export default WorkflowSerializer
