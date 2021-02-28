const sections = (fields) => fields.filter(field => {
  return field.is_active
}).reduce((fields, field, index) => [
  ...fields,
  ...index === 0 && field.type !== 'section' ? [{
    type: 'section',
    fields: []
  }] : [],
  field
], []).reduce((sections, field) => ({
  ...sections,
  ...field.type === 'section' ? {
    current: sections.current + 1,
    records: [
      ...sections.records,
      {
        label: field.label,
        instructions: field.instructions
      }
    ]
  } : {
    records: sections.records.map((section, index) => {
      if(index !== sections.current) return section
      return {
        ...section,
        fields: [
          ...section.fields || [],
          _getControl(field)
        ]
      }
    })
  }
}), { records: [], current: -1 }).records

const _getControl = (field) => ({
  ...field.config,
  type: _getType(field),
  ...field.type === 'imagefield' ? {
    prompt: 'Choose Image',
    action: '/api/admin/assets/upload',
    endpoint: '/api/admin/assets',
    multiple: false
  } : {}
})

const _getType = ({ type, config }) => {
  if(type === 'imagefield') return 'filefield'
  if(type === 'lookup') return config.multiple ? 'lookup2' : 'lookup'
  return type
}

export default sections
