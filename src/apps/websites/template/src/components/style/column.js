import { applyBoxModel, applyRule } from './utils'
import Block from './block'

const getAlignment = (config) => {
  const align = config ? config.align : 'top'
  if(align === 'top') return { margin: '0 0 auto' }
  if(align === 'middle') return { margin: 'auto 0' }
  if(align === 'bottom') return { margin: 'auto 0 0' }
}

const getColumn = (selector, cols) => ({
  flex: `0 0 calc(100%*(${cols}/12))`
})

export default function Column(site, config, column, namespace) {

  const selector = `${namespace} .c`

  applyRule(config.all, namespace, getColumn(namespace, 3))
  applyRule(config.tablet, namespace, getColumn(namespace, 6))
  applyRule(config.mobile, namespace, getColumn(namespace, 12))

  applyBoxModel(config, selector, column)

  applyRule(config.all, selector, getAlignment(column.alignment))

  if(column.blocks) {
    config = column.blocks.reduce((config, block, bindex) => {
      return Block(site, config, block, `${namespace} .b${bindex}`)
    }, config)
  }

  return config

}
