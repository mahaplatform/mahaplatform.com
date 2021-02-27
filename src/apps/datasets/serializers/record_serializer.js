const recordSerializer = (req, result) => ({
  id: result.get('id'),
  values: values(req, result.get('values')),
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const values = (req, values) => values ? Object.keys(values).reduce((sanitized, code) => {
  const field = req.fields.find(field => field.get('code') === code)
  if(!field) return sanitized
  const { multiple } = field.get('config')
  return {
    ...sanitized,
    [code]: multiple === false ? values[code][0] : values[code]
  }
}, {}) : {}

export default recordSerializer
