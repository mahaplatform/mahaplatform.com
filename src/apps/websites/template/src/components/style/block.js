import { applyBoxModel, applyResponsiveRule, applyRule, withUnits } from './utils'

const applyFontSize = (ruleset, namespace, fontSize) => {
  applyRule(ruleset.standard, namespace, { fontSize: withUnits(fontSize,'px') })
}

const applyColor = (ruleset, namespace, color) => {
  applyRule(ruleset.standard, namespace, { color })
}

const applyButton = (rulesets, namespace, button) => {
  if(button.custom !== true) return
  applyResponsiveRule(rulesets, namespace, button.fontSize, applyFontSize)
  applyResponsiveRule(rulesets, namespace, button.color, applyColor)
  applyBoxModel(rulesets, namespace, {
    ...button,
    background: {
      background: button.background
    }
  })
}

export default function Block(site, rulesets, block, namespace) {

  applyBoxModel(rulesets, namespace, block)

  if(block.button) applyButton(rulesets, `${namespace}>.bt`, block.button)

  return rulesets

}
