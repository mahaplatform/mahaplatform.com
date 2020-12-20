import { applyBoxModel, applyRule } from './utils'
import Block from './block'

const getAlignment = (config) => {
  const align = config ? config.align : 'top'
  if(align === 'top') return { margin: '0 0 auto' }
  if(align === 'middle') return { margin: 'auto 0' }
  if(align === 'bottom') return { margin: 'auto 0 0' }
}

const getBasis = (cols) => {
  if(cols === 1) return 'calc(100%/12)'
  if(cols === 2) return 'calc(100%/6)'
  if(cols === 3) return '25%'
  if(cols === 4) return 'calc(100%/3)'
  if(cols === 6) return '50%'
  if(cols === 9) return '75%'
  if(cols === 12) return '100%'
  return `calc(100%*(${cols}/12))`
}

const getColumn = (selector, cols) => ({
  flex: `0 0 ${getBasis(cols)}`
})

const applyLayout = (config, namespace) => {
  applyRule(config.all, namespace, getColumn(namespace, 3))
  applyRule(config.tablet, namespace, getColumn(namespace, 6))
  applyRule(config.mobile, namespace, getColumn(namespace, 12))
}

export default function Column(site, config, column, namespace) {

  const selector = `${namespace}>*`

  applyLayout(config, namespace)

  applyBoxModel(config, selector, column)

  applyRule(config.all, selector, getAlignment(column.alignment))

  if(column.blocks) {
    config = column.blocks.reduce((config, block, bindex) => {
      return Block(site, config, block, `${namespace}${bindex}`)
    }, config)
  }

  return config

}
