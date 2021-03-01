import _ from 'lodash'

const fieldSerializer = (req, result) => ({
  id: result.get('id'),
  delta: result.get('delta'),
  code: result.get('code'),
  name: result.get('name'),
  type: result.get('type'),
  config: config(req, result),
  is_active: result.get('is_active'),
  is_mutable: result.get('is_mutable'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const config = (req, result) => {

  const config = result.get('config')

  const type = result.get('type')

  const defaultConfig = {
    label: config.label,
    instructions: config.instructions,
    required: config.required
  }

  const lookupConfig = (type === 'lookup') ? {
    multiple: config.multiple === true ? true : false
  } : {}

  const dataConfig = (_.includes(['checkboxgroup','radiogroup','lookup','dropdown'], type)) ? {
    endpoint: config.datasource ? config.datasource.endpoint : null,
    data_type: config.data_type,
    options: config.options,
    value: config.datasource ? (config.datasource.value || 'value') : 'value',
    text: config.datasource ? (config.datasource.text || 'text') : 'text',
    type_id: config.datasource ? config.datasource.type_id : null
  } : {}

  const textConfig = (_.includes(['textfield','textarea'], type)) ? {
    placeholder: config.placeholder,
    min_length: config.min_length,
    max_length: config.max_length
  } : {}

  const numberConfig = (type === 'numberfield') ? {
    placeholder: config.placeholder,
    min: config.min,
    max: config.max
  } : {}

  const checkboxConfig = (type === 'checkbox') ? {
    prompt: config.prompt || '<p></p>'
  } : {}

  return {
    ...defaultConfig,
    ...checkboxConfig,
    ...lookupConfig,
    ...dataConfig,
    ...textConfig,
    ...numberConfig
  }

}

export default fieldSerializer
