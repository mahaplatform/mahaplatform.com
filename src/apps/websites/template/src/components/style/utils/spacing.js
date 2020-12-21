import { applyRule, applyResponsiveRule, expand } from './utils'

const applyMargin = (ruleset, selector, margin) => {
  applyRule(ruleset.standard, selector, { margin: expand(margin, 'px') })
}

const applyPadding = (ruleset, selector, padding) => {
  applyRule(ruleset.standard, selector, { padding: expand(padding, 'px') })
}

export const applySpacing = (rulesets, selector, spacing) => {
  if(!spacing) return
  applyResponsiveRule(rulesets, selector, spacing.margin, applyMargin)
  applyResponsiveRule(rulesets, selector, spacing.padding, applyPadding)
}
