export const withUnits = (value, unit = 'px') => {
  return `${value}${unit}`
}

export const getBackground = (config) => {
  if(!config) return {}
  const { color, image, repeat, position, size } = config
  const properties = {}
  if(color) properties.backgroundColor = color
  if(image) properties.backgroundImage = `url(/imagecache/${image})`
  if(repeat) properties.backgroundRepeat = repeat
  if(position) properties.backgroundPosition = position
  if(size) properties.backgroundSize = size
  return properties
}

export const getSpacing = (config) => {
  if(!config) return {}
  const { margin, padding } = config
  const properties = {}
  if(margin) properties.margin = withUnits(margin)
  if(padding) properties.padding = withUnits(padding)
  return properties
}

export const getBorder = (config) => {
  if(!config) return {}
  const { radius, style, width, color } = config
  const properties = {}
  if(radius) properties.borderRadius = withUnits(radius)
  if(style) properties.borderStyle = style
  if(width) properties.borderWidth = withUnits(width)
  if(color) properties.borderColor = color
  return properties
}
