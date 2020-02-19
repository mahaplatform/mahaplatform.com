const ListSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  contacts_count: result.get('contacts_count'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

export default ListSerializer
