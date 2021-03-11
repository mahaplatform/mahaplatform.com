import { applyRule, applyResponsiveRule} from './utils'

export const applyTextAlign = (ruleset, selector, textAlign) => {
  applyRule(ruleset.standard, selector, { textAlign })
}

export const applyText = (rulesets, selector, text) => {
  if(!text) return
  applyResponsiveRule(rulesets, selector, text.align, applyTextAlign)
}
