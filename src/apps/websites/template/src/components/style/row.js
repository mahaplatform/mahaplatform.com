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
  return { flex: fullWidth ? 1 : `0 0 ${withUnits(customWidth || 980)}` }
}

export default function Row(site, config, row, namespace) {

  const selector = `${namespace}>*`

  applyBoxModel(config, selector, row)

  applyRule(config.all, selector, getAlignment(row.alignment))

  applyRule(config.desktop, selector, getSizing(row.sizing))

  if(row.columns) {
    config = row.columns.reduce((config, column, cindex) => {
      return Column(site, config, column, `${namespace} .c${cindex}`)
    }, config)
  }

  return config

}
