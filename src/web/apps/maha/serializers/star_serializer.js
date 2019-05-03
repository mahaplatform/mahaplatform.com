import serializer from '../../../core/objects/serializer'

const StarSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default StarSerializer
