import { applyBoxModel } from './utils'

export default function Block(site, rules, block, namespace) {

  applyBoxModel(rules, namespace, block)

  return rules

}
