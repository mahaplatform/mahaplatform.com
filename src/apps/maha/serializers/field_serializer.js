import _ from 'lodash'

const fieldSerializer = (req, result) => ({
  id: result.get('id'),
  delta: result.get('delta'),
  label: result.get('label'),
  code: result.get('code'),
  name: result.get('name'),
  instructions: result.get('instructions'),
  type: result.get('type'),
  config: config(req, result),
  is_mutable: result.get('is_mutable'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const config = (req, result) => {

  const config = result.get('config')

  const type = result.get('type')

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

  const textareaConfig = (type === 'textarea') ? {
    minLength: config.minLength,
    maxLength: config.maxLength
  } : {}

  return {
    label: result.get('label'),
    name: `values.${result.get('code')}`,
    type: result.get('type'),
    ...lookupConfig,
    ...dataConfig,
    ...textareaConfig
  }

}

export default fieldSerializer
