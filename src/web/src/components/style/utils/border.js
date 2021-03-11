import { applyRule, applyResponsiveRule, expand } from './utils'

const applyRadius = (ruleset, selector, radius) => {
  applyRule(ruleset.standard, selector, {
    borderRadius: expand(radius, 'px'),
    overflow: 'hidden'
  })
}

const applyWidth = (ruleset, selector, width) => {
  applyRule(ruleset.standard, selector, { borderWidth: expand(width, 'px') })
}

const applyColor = (ruleset, selector, color) => {
  applyRule(ruleset.standard, selector, { borderColor: expand(color) })
}

const applyStyle = (ruleset, selector, style) => {
  applyRule(ruleset.standard, selector, { borderStyle: expand(style) })
}

export const applyBorder = (rulesets, selector, border) => {
  if(!border) return
  applyResponsiveRule(rulesets, selector, border.radius, applyRadius)
  applyResponsiveRule(rulesets, selector, border.width, applyWidth)
  applyResponsiveRule(rulesets, selector, border.color, applyColor)
  applyResponsiveRule(rulesets, selector, border.style, applyStyle)
}
