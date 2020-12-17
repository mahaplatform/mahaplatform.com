import { getBorder, getBackground, getSpacing } from './utils'

export default function Block(config, block, sindex, rindex, cindex, bindex) {

  const namespace = `.s${sindex}r${rindex}c${cindex}b${bindex}`

  config.all.push({
    selector: `${namespace} .b`,
    properties: {
      ...getBackground(block.background),
      ...getSpacing(block.spacing),
      ...getBorder(block.border)
    }
  })

  return config

}
