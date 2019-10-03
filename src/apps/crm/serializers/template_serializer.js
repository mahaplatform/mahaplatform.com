const TemplateSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  type: result.get('type'),
  config: result.get('config'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default TemplateSerializer
