import serializer from '../core/objects/serializer'

const userSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  full_name: result.get('full_name'),

  initials: result.get('initials'),

  email: result.get('email'),

  photo: result.related('photo').get('path')

}))

export default userSerializer
