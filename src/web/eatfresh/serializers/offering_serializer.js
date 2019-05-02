import { serializer } from 'maha'

const offeringSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  slug: result.get('slug'),

  title: result.get('title'),

  photo: result.related('photo').get('path'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default offeringSerializer
