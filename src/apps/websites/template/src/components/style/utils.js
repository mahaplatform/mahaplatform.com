import _ from 'lodash'
import qs from 'qs'

const expand = (value) => {
  if(typeof(value) === 'string') return withUnits(value)
  const uniq = _.uniq(value)
  if(uniq.length === 1) return withUnits(uniq[0])
  return value.map(subvalue => withUnits(subvalue)).join(' ')
}

export const withUnits = (value, unit = 'px') => {
  return `${value}${unit}`
}

export const imageUrl = (src, transform) => {
  const host = process.env.NODE_ENV !== 'production' ? 'https://assets.mahaplatform.com' : ''
  const imagecache = '/imagecache' + (transform ? `/${qs.stringify(transform)}` : '')
  return `url(${host}${imagecache}${src})`
}

export const getBackground = (config) => {
  if(!config) return {}
  const { color, repeat, position, size } = config
  const properties = {}
  if(color) properties.backgroundColor = color
  if(repeat) properties.backgroundRepeat = repeat
  if(position) properties.backgroundPosition = position
  properties.backgroundSize = size || 'cover'
  return properties
}

export const getBackgroundImage = (image, dpi = 1) => {
  return { backgroundImage: imageUrl(image, { dpi }) }
}

export const getSpacing = (config) => {
  if(!config) return {}
  const { margin, padding } = config
  const properties = {}
  if(margin) properties.margin = expand(margin)
  if(padding) properties.padding = expand(padding)
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

export const applyRule = (config, selector, properties) => {
  const index = _.findIndex(config, { selector })
  if(index < 0) return config.push({ selector, properties })
  config[index].properties = Object.assign(config[index].properties, properties)
}

export const applyBoxModel = (config, selector, item) => {
  if(item.background && item.background.image) {
    applyRule(config.all, selector, getBackgroundImage(item.background.image, 1))
    applyRule(config.retina, selector, getBackgroundImage(item.background.image, 2))
  }
  applyRule(config.all, selector, {
    ...getBackground(item.background),
    ...getSpacing(item.spacing),
    ...getBorder(item.border)
  })
}
