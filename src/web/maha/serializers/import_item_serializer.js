import serializer from '../core/objects/serializer'

const importItemSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  values: result.get('values')

}))

export default importItemSerializer
