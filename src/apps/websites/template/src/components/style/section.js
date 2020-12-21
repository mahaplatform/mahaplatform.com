import { applyBoxModel } from './utils'
import Row from './row'

export default function Section(site, rules, section, namespace) {

  applyBoxModel(rules, namespace, section)

  if(section.content && section.content.rows) {
    rules = section.content.rows.reduce((config, row, rindex) => {
      return Row(site, config, row, `${namespace}${rindex}`)
    }, rules)
  }

  return rules

}
