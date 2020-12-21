import { applyRule, applyResponsiveRule, withUnits } from './utils'
import qs from 'qs'

const imageUrl = (src, transform) => {
  const host = process.env.NODE_ENV !== 'production' ? 'https://assets.mahaplatform.com' : ''
  const imagecache = '/imagecache' + (transform ? `/${qs.stringify(transform)}` : '')
  return `url(${host}${imagecache}${src})`
}

const getBackgroundImage  = (background, dpi) => {
  const { image, position, repeat, size } = background
  if(!image) return
  const properties = {}
  properties.backgroundImage = imageUrl(image, { dpi })
  properties.backgroundSize = size || 'cover'
  if(repeat) properties.backgroundRepeat = repeat
  if(position) properties.backgroundPosition = position
  return properties
}

const applyBackgroundColor = (ruleset, selector, background) => {
  if(!background.color) return
  applyRule(ruleset.standard, selector, {
    backgroundColor: background.color
  })
}

const getRadialGradient = (ruleset, selector, background) => {
  const { color1, color2, direction, start, end } = background
  const properties = {}
  properties.backgroundImage = `radial-gradient(circle at ${direction}, ${color1} ${withUnits(start, '%')}, ${color2} ${withUnits(end, '%')})`
  return properties
}

const getLinearGradient = (ruleset, selector, background) => {
  const { color1, color2, direction, start, end } = background
  const properties = {}
  properties.backgroundImage = `linear-gradient(${withUnits(direction, 'deg')}, ${color1} ${withUnits(start, '%')}, ${color2} ${withUnits(end, '%')})`
  return properties
}

const applyBackgroundGradient = (ruleset, selector, background) => {
  const { color1, color2, style } = background
  if(!color1 || !color2 || !style) return
  const getter = style === 'radial' ? getRadialGradient : getLinearGradient
  console.log(style)
  applyRule(ruleset.standard, selector, getter(ruleset, selector, background))
}

const applyBackgroundImage = (ruleset, selector, background) => {
  if(!background.image) return
  applyRule(ruleset.standard, selector, getBackgroundImage(background, 1))
  applyRule(ruleset.retina, selector, getBackgroundImage(background, 2))
}

const applyBackgroundType = (ruleset, selector, background) => {
  if(!background) return
  if(background.type === 'color') applyBackgroundColor(ruleset, selector, background)
  if(background.type === 'gradient') applyBackgroundGradient(ruleset, selector, background)
  if(background.type === 'image') applyBackgroundImage(ruleset, selector, background)
}

export const applyBackground = (rulesets, selector, background) => {
  if(!background) return
  applyResponsiveRule(rulesets, selector, background.background, applyBackgroundType)
}
