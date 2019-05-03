import serializer from '../../../core/objects/serializer'

const memberSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  full_name: full_name(req, result),

  first_name: value(req, result, 'first_name'),

  last_name: value(req, result, 'last_name'),

  email: value(req, result, 'email'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const full_name = (req, result) => {

  return `${value(req, result, 'first_name')} ${value(req, result, 'last_name')}`

}

const value = (req, result, name) => {

  const field = req.fields.find(field => field.get('name') === name)

  const value = result.get('values')[field.get('code')]

  return value && value.length > 0 ? value[0] : `ID#${result.get('id')}`

}

export default memberSerializer
