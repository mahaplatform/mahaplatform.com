import serializer from '../../../core/objects/serializer'

const BatchSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  user: user(result, 'user'),

  integration: result.get('integration'),

  items_count: result.get('items_count'),

  total: result.get('total'),

  date: result.get('date'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const user = (result, key) => {

  if(!result.related(key)) return null

  return {

    id: result.related(key).get('id'),

    full_name: result.related(key).get('full_name'),

    initials: result.related(key).get('initials'),

    photo: result.related(key).related('photo') ? result.related(key).related('photo').get('path') : null

  }

}

export default BatchSerializer
