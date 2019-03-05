import serializer from '../objects/serializer'

const teamSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  title: result.get('title'),

  subdomain: result.get('subdomain'),

  color: result.get('color'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default teamSerializer
