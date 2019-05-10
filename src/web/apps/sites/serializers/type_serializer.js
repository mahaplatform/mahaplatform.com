const typeSerializer = (req, trx, result) => ({

  id: result.get('id'),

  title: result.get('title'),

  description: result.get('description'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

})

export default typeSerializer
