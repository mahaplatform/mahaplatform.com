import { serializer } from 'maha'

const commitmentSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  resource: {

    id: result.related('resource').get('id'),

    title: result.related('resource').get('title'),

    description: result.related('resource').get('description'),

    url: result.related('resource').get('url')

  },

  description: result.get('description'),

  is_complete: result.get('is_complete'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default commitmentSerializer
