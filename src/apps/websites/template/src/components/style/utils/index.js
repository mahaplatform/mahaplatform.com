export { applyResponsiveRule, applyRule, withUnits } from './utils'
import { applyAnimation } from './animation'
import { applyBackground } from './background'
import { applyBoxShadow } from './box_shadow'
import { applySpacing } from './spacing'
import { applyBorder } from './border'

export const applyBoxModel = (rulesets, selector, item) => {
  applyAnimation(rulesets, selector, item.animation)
  applyBackground(rulesets, selector, item.background)
  applySpacing(rulesets, selector, item.spacing)
  applyBorder(rulesets, selector, item.border)
  applyBoxShadow(rulesets, selector, item.boxShadow)
}
