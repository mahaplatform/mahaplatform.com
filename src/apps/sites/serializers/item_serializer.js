import { serializer } from 'maha'

const itemSerializer = serializer(async (req, trx, result) => ({

  id: result.get('id'),

  title: title(req, trx, result),

  values: values(result.get('values')),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const title = (req, trx, result) => {

  const field = req.fields[0]

  const value = result.get('values')[field.get('code')]

  return value && value.length > 0 ? value[0] : `ID#${result.get('id')}`

}

const values = (values) => Object.key(values).reduce((sanitized, key) => ({
  ...sanitized,
  [key]: values[key].length > 0 ? values[key] : values[key][0]
}), {})

export default itemSerializer
