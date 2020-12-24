import { applyBoxModel, applyRule, withUnits } from './utils'
import Column from './column'

const getAlignment = (config) => {
  const align = config ? config.align : 'center'
  if(align === 'left') return { margin: '0 auto 0 0' }
  if(align === 'center') return { margin: '0 auto' }
  if(align === 'right') return { margin: '0 0 0 auto' }
}

const getSizing = (config) => {
  if(!config) return {}
  const { customWidth, fullWidth } = config
  return { flex: fullWidth ? 1 : `0 0 ${withUnits(customWidth || 980, 'px')}` }
}

export default function Row(site, rules, row, namespace) {

  applyRule(rules.all.standard, `.r${namespace}>*`, getAlignment(row.alignment))

  applyRule(rules.desktop.standard, `.r${namespace}>*`, getSizing(row.sizing))

  applyBoxModel(rules, `.r${namespace}>*>*`, row)

  if(row.content && row.content.template && row.content.data) {
    rules = row.content.data.reduce((rules, record, cindex) => {
      return Column(site, rules, row.content.template, row.content.layout, cindex, `${namespace}${cindex}`)
    }, rules)
  } else if(row.content && row.content.columns) {
    rules = row.content.columns.reduce((rules, column, cindex) => {
      return Column(site, rules, column, row.content.layout, cindex, `${namespace}${cindex}`)
    }, rules)
  }

  return rules

}
