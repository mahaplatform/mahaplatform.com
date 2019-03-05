import { serializer } from 'maha'

const CountySerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  name: result.get('name')

}))

export default CountySerializer
