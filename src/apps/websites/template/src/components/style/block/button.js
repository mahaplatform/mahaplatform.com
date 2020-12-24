import { applyBoxModel, applyResponsiveRule, applyRule, withUnits } from '../utils'

const applyFontSize = (ruleset, namespace, fontSize) => {
  applyRule(ruleset.standard, namespace, { fontSize: withUnits(fontSize,'px') })
}

const applyColor = (ruleset, namespace, color) => {
  applyRule(ruleset.standard, namespace, { color })
}

export default function ButtonBlock(site, rulesets, block, namespace) {
  const { button } = block
  if(button.custom !== true) return
  namespace = `${namespace}>.bb`
  applyResponsiveRule(rulesets, namespace, button.fontSize, applyFontSize)
  applyResponsiveRule(rulesets, namespace, button.color, applyColor)
  applyBoxModel(rulesets, namespace, {
    ...button,
    background: {
      background: button.background
    }
  })
}
