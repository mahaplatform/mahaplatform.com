import _ from 'lodash'

export const withUnits = (value, unit) => {
  return _.isNumber(value) ? `${value}${unit}` : value
}

export const expand = (value, unit = '') => {
  return _.castArray(value).map(subvalue => withUnits(subvalue, unit)).join(' ')
}

export const applyResponsiveRule = (rulesets, selector, rule, applicator, extra) => {
  if(rule === undefined) return
  if(!_.isPlainObject(rule)) return applicator(rulesets.all, selector, rule, extra)
  if(rule.hover !== undefined) applicator(rulesets.desktop, `${selector}:hover`, rule.hover, extra)
  if(rule.isResponsive !== true && rule.all !== undefined) return applicator(rulesets.all, selector, rule.all, extra)
  if(rule.isResponsive !== true && rule.hover === undefined && rule.all === undefined) return applicator(rulesets.all, selector, rule, extra)
  if(rule.desktop !== undefined) applicator(rulesets.desktop, selector, rule.desktop, extra)
  if(rule.tablet !== undefined) applicator(rulesets.tablet, selector, rule.tablet, extra)
  if(rule.mobile !== undefined) applicator(rulesets.mobile, selector, rule.mobile, extra)
}

export const applyRule = (ruleset, selector, properties) => {
  const index = _.findIndex(ruleset, { selector })
  if(index < 0) return ruleset.push({ selector, properties })
  ruleset[index].properties = Object.assign(ruleset[index].properties, properties)
}
