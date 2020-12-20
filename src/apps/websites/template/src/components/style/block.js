import { applyBoxModel } from './utils'

export default function Block(site, config, block, namespace) {

  applyBoxModel(config, namespace, block)

  return config

}
