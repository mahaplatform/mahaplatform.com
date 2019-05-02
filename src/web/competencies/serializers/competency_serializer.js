import { serializer } from 'maha'

const competencySerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  title: result.get('title'),

  description: result.get('description'),

  level: result.get('level'),

  category: result.related('category') ? result.related('category').get('title') : null,

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default competencySerializer
