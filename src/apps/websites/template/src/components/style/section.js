import { applyBoxModel } from './utils'
import Row from './row'


export default function Section(site, config, section, namespace) {

  const selector = `${namespace}>*`

  applyBoxModel(config, selector, section)

  if(section.rows) {
    config = section.rows.reduce((config, row, rindex) => {
      return Row(site, config, row, `${namespace} .r${rindex}`)
    }, config)
  }
  return config

}
