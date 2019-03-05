import { serializer } from 'maha'

const classificationSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  title: result.get('title'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default classificationSerializer
