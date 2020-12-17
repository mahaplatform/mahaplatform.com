const getBackground = (config) => {
  if(!config) return {}
  const { color } = config
  const properties = {}
  if(color) properties.backgroundColor = color
  return properties
}

const getSpacing = (config) => {
  if(!config) return {}
  const { margin, padding } = config
  const properties = {}
  if(margin) properties.margin = `${margin}px`
  if(padding) properties.padding = `${padding}px`
  return properties
}

const getBorder = (config) => {
  if(!config) return {}
  const { radius, style, width, color } = config
  const properties = {}
  if(radius) properties.borderRadius = `${radius}px`
  if(style) properties.borderStyle = style
  if(width) properties.borderWidth = `${width}px`
  if(color) properties.borderColor = color
  return properties
}

export default function Row(config, column, rindex, cindex) {

  const namespace = `.r${rindex}c${cindex}`

  config.all.push({
    selector: `${namespace} .c`,
    properties: {
      ...getBackground(column.background),
      ...getSpacing(column.spacing),
      ...getBorder(column.border)
    }
  })

  return config

}
