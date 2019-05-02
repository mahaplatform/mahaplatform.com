import { serializer } from 'maha'

const goalSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  competency: {

    id: result.related('competency').get('id'),

    title: result.related('competency').get('title'),

    description: result.related('competency').get('description'),

    level: result.related('competency').get('level')

  },

  is_complete: result.get('is_complete'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default goalSerializer
