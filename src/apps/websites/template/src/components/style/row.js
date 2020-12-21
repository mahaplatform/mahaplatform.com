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

  const selector = `${namespace}>*`

  applyBoxModel(rules, selector, row)

  applyRule(rules.all.standard, selector, getAlignment(row.alignment))

  applyRule(rules.desktop.standard, selector, getSizing(row.sizing))

  if(row.content.columns) {
    rules = row.content.columns.reduce((rules, column, cindex) => {
      return Column(site, rules, column, row.content.layout, cindex, `${namespace}${cindex}`)
    }, rules)
  }

  return rules

}
