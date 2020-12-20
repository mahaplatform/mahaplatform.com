import { applyBoxModel } from './utils'
import Row from './row'

export default function Section(site, config, section, namespace) {

  applyBoxModel(config, namespace, section)

  if(section.rows) {
    config = section.rows.reduce((config, row, rindex) => {
      return Row(site, config, row, `${namespace}${rindex}`)
    }, config)
  }
  return config

}
