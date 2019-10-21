const ProgramSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  logo: result.related('logo') ? result.related('logo').get('path') : null,
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default ProgramSerializer
