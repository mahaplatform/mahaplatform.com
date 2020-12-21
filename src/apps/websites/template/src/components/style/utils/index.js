export { applyResponsiveRule, applyRule, withUnits } from './utils'
import { applyBackground } from './background'
import { applySpacing } from './spacing'
import { applyBorder } from './border'

export const applyBoxModel = (rulesets, selector, item) => {
  applyBackground(rulesets, selector, item.background)
  applySpacing(rulesets, selector, item.spacing)
  applyBorder(rulesets, selector, item.border)
}
