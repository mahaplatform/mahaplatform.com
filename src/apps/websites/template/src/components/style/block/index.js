import { applyBoxModel, applyResponsiveRule, applyRule, withUnits } from '../utils'
import Button from './button'
import Image from './image'

export default function Block(site, rulesets, block, namespace) {

  applyBoxModel(rulesets, namespace, block)

  if(block.type === 'button') Button(site, rulesets, block, namespace)

  if(block.type === 'image') Image(site, rulesets, block, namespace)

  return rulesets

}
