import serializer from '../../../core/objects/serializer'

const CountySerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  name: result.get('name')

}))

export default CountySerializer
