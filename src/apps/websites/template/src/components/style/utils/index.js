export { applyResponsiveRule, applyRule, withUnits } from './utils'
import { applyAnimation } from './animation'
import { applyBackground } from './background'
import { applyBoxShadow } from './box_shadow'
import { applySpacing } from './spacing'
import { applySizing } from './sizing'
import { applyBorder } from './border'
import { applyFilter } from './filter'
import { applyText } from './text'

export const applyBoxModel = (rulesets, selector, item) => {
  applyAnimation(rulesets, selector, item.animation)
  applyBackground(rulesets, selector, item.background)
  applyBorder(rulesets, selector, item.border)
  applyBoxShadow(rulesets, selector, item.boxShadow)
  applySpacing(rulesets, selector, item.spacing)
  applySizing(rulesets, selector, item.sizing)
  applyText(rulesets, selector, item.text)
}

export const applyDesign = (rulesets, selector, item) => {
  applyFilter(rulesets, selector, item.filter)
}
