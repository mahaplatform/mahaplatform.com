import serializer from '../../../core/objects/serializer'

const emailSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  code: result.get('code'),

  subject: result.get('subject'),

  text: result.get('text'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default emailSerializer
