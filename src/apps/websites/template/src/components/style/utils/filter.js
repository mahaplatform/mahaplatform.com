import { applyRule, withUnits } from './utils'

const getFilter = ({ hue, saturation, brightness, contrast, sepia, opacity, blur }) => {
  const filters = []
  if(hue) filters.push(`hue(${withUnits(hue, 'deg')})`)
  if(saturation) filters.push(`saturation(${withUnits(saturation, '%')})`)
  if(brightness) filters.push(`brightness(${withUnits(brightness, '%')})`)
  if(contrast) filters.push(`contrast(${withUnits(contrast, '%')})`)
  if(sepia) filters.push(`sepia(${withUnits(sepia, '%')})`)
  if(opacity) filters.push(`opacity(${withUnits(opacity, '%')})`)
  if(blur) filters.push(`blur(${withUnits(blur, 'px')})`)
  return filters.join(' ')
}

export const applyFilter = (rulesets, selector, filter) => {
  if(!filter) return
  applyRule(rulesets.all.standard, selector, { filter: getFilter(filter) })
  if(filter.blendMode) applyRule(rulesets.all.standard, selector, { mixBlendMode: filter.blendMode })
}
