import { applyRule, applyResponsiveRule, withUnits } from './utils'


const applyHeight = (ruleset, selector, height, property) => {
  applyRule(ruleset.standard, selector, {
    overflow: 'hidden',
    [property]: withUnits(height, 'px')
  })
}

export const applySizing = (rulesets, selector, sizing) => {
  if(!sizing) return
  applyResponsiveRule(rulesets, selector, sizing.height, applyHeight, 'height')
  applyResponsiveRule(rulesets, selector, sizing.minHeight, applyHeight, 'minHeight')
  applyResponsiveRule(rulesets, selector, sizing.maxHeight, applyHeight, 'maxHeight')
}
