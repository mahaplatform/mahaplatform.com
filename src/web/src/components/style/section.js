import { applyBoxModel } from './utils'
import Row from './row'

export default function Section(website, rules, section, namespace) {

  const styles = section.styles || {}

  applyBoxModel(rules, `.s${namespace}`, styles)

  if(section.content && section.content.rows) {
    rules = section.content.rows.reduce((config, row, rindex) => {
      return Row(website, config, row, `${namespace}${rindex}`)
    }, rules)
  }

  return rules

}
