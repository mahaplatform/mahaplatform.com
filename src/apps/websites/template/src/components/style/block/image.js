import { applyBoxModel, applyResponsiveRule, applyRule, withUnits } from '../utils'

export default function ImageBlock(site, rulesets, block, namespace) {

  if(block.caption) applyBoxModel(rulesets, `${namespace} .imc`, block.caption)
  
  if(block.image) applyBoxModel(rulesets, `${namespace} .imi`, block.image)

  return rulesets

}
