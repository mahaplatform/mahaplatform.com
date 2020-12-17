import { getBorder, getBackground, getSpacing } from './utils'
import Block from './block'

export default function Column(config, column, sindex, rindex, cindex) {

  const namespace = `.s${sindex}r${rindex}c${cindex}`

  config.all.push({
    selector: `${namespace} .c`,
    properties: {
      ...getBackground(column.background),
      ...getSpacing(column.spacing),
      ...getBorder(column.border)
    }
  })

  config = column.blocks.reduce((config, block, bindex) => {
    return Block(config, block, sindex, rindex, cindex, bindex)
  }, config)

  return config

}
