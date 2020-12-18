import { applyBoxModel } from './utils'

export default function Block(site, config, block, namespace) {

  const selector = `${namespace} .b`

  applyBoxModel(config, selector, block)

  return config

}
