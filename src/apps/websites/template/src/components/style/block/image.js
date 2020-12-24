import { applyBoxModel, applyResponsiveRule, applyRule, withUnits } from '../utils'

export default function ImageBlock(site, rulesets, block, namespace) {

  if(block.caption) applyBoxModel(rulesets, `${namespace} .bic`, block.caption)

  if(block.image) applyBoxModel(rulesets, `${namespace} .bii`, block.image)

  return rulesets

}
