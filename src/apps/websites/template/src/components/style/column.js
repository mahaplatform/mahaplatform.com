import { applyBoxModel, applyRule, applyResponsiveRule } from './utils'
import Block from './block'

const getAlignment = (alignment) => {
  const align = alignment ? alignment.align.all : 'top'
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

const getColumn = (layout, cindex) => {
  const index = cindex % layout.length
  return { flex: `0 0 ${getBasis(layout[index])}` }
}

const applyLayout = (ruleset, namespace, layout, cindex) => {
  applyRule(ruleset.standard, namespace, getColumn(layout, cindex))
}

export default function Column(site, rules, column, layout, cindex, namespace) {

  const selector = `${namespace}>*`

  applyResponsiveRule(rules, namespace, layout, applyLayout, cindex)

  applyBoxModel(rules, selector, column)

  applyRule(rules.all.standard, selector, getAlignment(column.alignment))

  if(column.content.blocks) {
    rules = column.content.blocks.reduce((config, block, bindex) => {
      return Block(site, config, block, `${namespace}${bindex}`)
    }, rules)
  }

  return rules

}
