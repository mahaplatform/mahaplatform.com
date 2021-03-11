import { applyBoxModel } from '../utils'
import Button from './button'
import Image from './image'

export default function Block(site, rulesets, block, namespace) {

  const styles = block.styles || {}

  applyBoxModel(rulesets, `.b${namespace}`, styles)

  if(block.type === 'button') Button(site, rulesets, styles, `.b${namespace}`)

  if(block.type === 'image') Image(site, rulesets, styles, `.b${namespace}`)

  return rulesets

}
