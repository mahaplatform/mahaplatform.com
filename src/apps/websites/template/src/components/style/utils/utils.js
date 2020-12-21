import _ from 'lodash'

export const withUnits = (value, unit) => {
  return `${value}${unit}`
}

export const expand = (value, unit) => {
  if(typeof(value) === 'string') return withUnits(value, unit)
  const uniq = _.uniq(value)
  if(uniq.length === 1) return withUnits(uniq[0], unit)
  return value.map(subvalue => withUnits(subvalue, unit)).join(' ')
}

export const applyResponsiveRule = (rulesets, selector, rule, applicator) => {
  if(!rule) return
  if(rule.isHover === true && rule.hover) applicator(rulesets.all, `${selector}:hover`, rule.hover)
  if(rule.isResponsive !== true && rule.all !== undefined) return applicator(rulesets.all, selector, rule.all)
  if(rule.desktop !== undefined) applicator(rulesets.desktop, selector, rule.desktop)
  if(rule.tablet !== undefined) applicator(rulesets.tablet, selector, rule.tablet)
  if(rule.mobile !== undefined) applicator(rulesets.mobile, selector, rule.mobile)
}

export const applyRule = (ruleset, selector, properties) => {
  const index = _.findIndex(ruleset, { selector })
  if(index < 0) return ruleset.push({ selector, properties })
  ruleset[index].properties = Object.assign(ruleset[index].properties, properties)
}
