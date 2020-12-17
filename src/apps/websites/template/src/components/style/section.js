import { getBorder, getBackground, getSpacing, withUnits } from './utils'
import Row from './row'

export default function Section(config, section, sindex) {

  const namespace = `.s${sindex}`

  config.all.push({
    selector: `${namespace} .s`,
    properties: {
      ...getBackground(section.background),
      ...getSpacing(section.spacing),
      ...getBorder(section.border)
    }
  })

  config = section.rows.reduce((config, row, rindex) => {
    return Row(config, row, sindex, rindex)
  }, config)

  return config

}
