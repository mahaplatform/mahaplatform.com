import { serializer } from 'maha'

const siteSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  title: result.get('title'),

  origins: result.related('origins').map(origin => origin.get('name')).join('\n'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))


export default siteSerializer
