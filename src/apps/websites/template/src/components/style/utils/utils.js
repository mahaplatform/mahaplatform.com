import _ from 'lodash'

export const withUnits = (value, unit) => {
  return `${value}${unit}`
}

export const expand = (value, unit) => {
  return _.castArray(value).map(subvalue => withUnits(subvalue, unit)).join(' ')
}

export const applyResponsiveRule = (rulesets, selector, rule, applicator, extra) => {
  if(!rule) return
  if(rule.isHover === true && rule.hover) applicator(rulesets.all, `${selector}:hover`, rule.hover, extra)
  if(rule.isResponsive !== true && rule.all !== undefined) return applicator(rulesets.all, selector, rule.all, extra)
  if(rule.desktop !== undefined) applicator(rulesets.desktop, selector, rule.desktop, extra)
  if(rule.tablet !== undefined) applicator(rulesets.tablet, selector, rule.tablet, extra)
  if(rule.mobile !== undefined) applicator(rulesets.mobile, selector, rule.mobile, extra)
}

export const applyRule = (ruleset, selector, properties) => {
  const index = _.findIndex(ruleset, { selector })
  if(index < 0) return ruleset.push({ selector, properties })
  ruleset[index].properties = Object.assign(ruleset[index].properties, properties)
}
