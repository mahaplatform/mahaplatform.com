const FormSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  config: result.get('config'),
  program: program(result.related('program')),
  email: email(result.related('email')),
  workflow: workflow(result.related('workflow')),
  num_responses: result.get('num_responses'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    merchant: merchant(program.related('merchant'))
  }
}

const merchant = (merchant) => {
  if(!merchant.id) return
  return {
    id: merchant.get('id'),
    title: merchant.get('title'),
    status: merchant.get('status')
  }
}

const email = (email) => {
  if(!email.id) return
  return {
    id: email.get('id'),
    title: email.get('title')
  }
}

const workflow = (workflow) => {
  if(!workflow.id) return
  return {
    id: workflow.get('id'),
    title: workflow.get('title')
  }
}

export default FormSerializer
