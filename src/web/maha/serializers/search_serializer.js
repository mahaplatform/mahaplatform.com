import serializer from '../core/objects/serializer'

const searchSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  text: result.get('text'),

  route: result.get('route'),

  extra: result.get('extra'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default searchSerializer
