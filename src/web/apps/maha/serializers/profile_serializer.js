import serializer from '../../../core/objects/serializer'

const profileSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  network: result.related('source').get('text'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default profileSerializer
