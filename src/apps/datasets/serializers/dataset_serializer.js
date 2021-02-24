const datasetSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  title: result.get('title'),
  types: result.related('types').map(type),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const type = (type) => {
  if(!type.id) return
  return {
    id: type.get('id'),
    title: type.get('title')
  }
}

export default datasetSerializer
