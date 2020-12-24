import { applyBoxModel, applyResponsiveRule, applyRule, withUnits } from '../utils'
import Button from './button'
import Image from './image'

export default function Block(site, rulesets, block, namespace) {

  applyBoxModel(rulesets, `.b${namespace}`, block)

  if(block.type === 'button') Button(site, rulesets, block, `.b${namespace}`)

  if(block.type === 'image') Image(site, rulesets, block, `.b${namespace}`)

  return rulesets

}
