const itemSerializer = (req, result) => ({
  id: result.get('id'),
  title: title(req, result),
  values: values(req, result.get('values')),
  is_published: result.get('is_published'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const title = (req, result) => {

  const field = req.fields[0]

  const value = result.get('values')[field.get('code')]

  return value && value.length > 0 ? value[0] : `ID#${result.get('id')}`

}

const values = (req, values) => Object.keys(values).reduce((sanitized, code) => {

  const field = req.fields.find(field => field.get('code') === code)

  const { multiple } = field.get('config')

  return {
    ...sanitized,
    [code]: multiple === true ? values[code] : values[code][0]
  }

}, {})

export default itemSerializer
