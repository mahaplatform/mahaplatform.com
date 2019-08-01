const sections = (fields) => {

  const sections = fields.reduce((fields, field, index) => [
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
      items: [
        ...sections.items,
        {
          label: field.label,
          instructions: field.instructions
        }
      ]
    } : {
      items: sections.items.map((section, index) => {
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
  }), { items: [], current: -1 })

  return sections.items.length > 0 ? sections.items : [{ fields: [] }]

}

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
