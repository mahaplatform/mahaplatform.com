import { applyBoxModel } from './utils'

export default function Block(site, config, block, namespace) {

  const selector = `${namespace}>*`

  applyBoxModel(config, selector, block)

  return config

}
