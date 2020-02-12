const EmailCampaignSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  workflow: workflow(result.related('workflow')),
  subject: result.get('subject'),
  reply_to: result.get('reply_to'),
  to: result.get('to'),
  code: result.get('code'),
  type: result.get('type'),
  status: result.get('status'),
  config: result.get('config'),
  send_at: result.get('send_at'),
  sent_at: result.get('sent_at'),
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

const workflow = (workflow) => {
  if(!workflow.id) return
  return {
    id: workflow.get('id'),
    title: workflow.get('title')
  }
}


export default EmailCampaignSerializer
