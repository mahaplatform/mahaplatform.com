const TemplateSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  title: result.get('title'),
  program: program(result.related('program')),
  has_preview: result.get('has_preview'),
  preview: result.get('preview'),
  type: result.get('type'),
  config: result.get('config'),
  deleted_at: result.get('deleted_at'),
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

export default TemplateSerializer
