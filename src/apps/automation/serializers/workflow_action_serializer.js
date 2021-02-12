const WorkflowActionSerializer = (req, result) => ({
  id: result.get('id'),
  step: result.get('step'),
  asset: asset(result.related('asset')),
  email: email(result.related('email')),
  sms: sms(result.related('sms')),
  list: list(result.related('list')),
  program: program(result.related('program')),
  recording: asset(result.related('recording')),
  topic: topic(result.related('topic')),
  user: user(result.related('user')),
  data: result.get('data'),
  description: result.get('description'),
  waited_until: result.get('waited_until'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const asset = (asset) => {
  if(!asset.get('id')) return null
  return {
    id: asset.get('id'),
    original_file_name: asset.get('original_file_name'),
    file_name: asset.get('file_name'),
    file_size: asset.get('file_size'),
    content_type: asset.get('content_type'),
    has_preview: asset.get('has_preview'),
    is_image: asset.get('is_image'),
    status: asset.get('status'),
    icon: asset.get('icon'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url'),
    source: asset.get('source'),
    source_url: asset.get('source_url')
  }
}

const email = (email) => {
  if(!email.id) return null
  return {
    id: email.get('id'),
    code: email.get('code'),
    subject: email.get('subject')
  }
}

const list = (list) => {
  if(!list.id) return null
  return {
    id: list.get('id'),
    title: list.get('title')
  }
}

const program = (program) => {
  if(!program.id) return null
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

const sms = (sms) => {
  if(!sms.id) return null
  return {
    id: sms.get('id'),
    body: sms.get('body')
  }
}

const topic = (topic) => {
  if(!topic.id) return null
  return {
    id: topic.get('id'),
    title: topic.get('title')
  }
}

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    cell_phone: user.get('cell_phone')
  }
}

export default WorkflowActionSerializer
