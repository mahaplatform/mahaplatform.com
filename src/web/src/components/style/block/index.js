import { applyBoxModel } from '../utils'
import Button from './button'
import Image from './image'

export default function Block(website, rulesets, block, namespace) {

  const styles = block.styles || {}

  applyBoxModel(rulesets, `.b${namespace}`, styles)

  if(block.type === 'button') Button(website, rulesets, styles, `.b${namespace}`)

  if(block.type === 'image') Image(website, rulesets, styles, `.b${namespace}`)

  return rulesets

}
