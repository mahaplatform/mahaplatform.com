export { applyResponsiveRule, applyRule, withUnits } from './utils'
import { applyAnimation } from './animation'
import { applyBackground } from './background'
import { applyBoxShadow } from './box_shadow'
import { applySpacing } from './spacing'
import { applyBorder } from './border'
import { applyFilter } from './filter'

export const applyBoxModel = (rulesets, selector, item) => {
  applyAnimation(rulesets, selector, item.animation)
  applyBackground(rulesets, selector, item.background)
  applyBorder(rulesets, selector, item.border)
  applyBoxShadow(rulesets, selector, item.boxShadow)
  applyFilter(rulesets, selector, item.filter)
  applySpacing(rulesets, selector, item.spacing)
}
