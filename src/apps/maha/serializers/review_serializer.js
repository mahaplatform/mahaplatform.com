import serializer from '../core/objects/serializer'

const reviewSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  uid: result.get('uid'),

  user: {

    id: result.related('user').get('id'),

    full_name: result.related('user').get('full_name'),

    initials: result.related('user').get('initials'),

    photo: result.related('user').related('photo').get('path')

  },

  score: result.get('score'),

  text: result.get('text'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default reviewSerializer
