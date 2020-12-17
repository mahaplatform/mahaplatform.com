import { getBorder, getBackground, getSpacing, withUnits } from './utils'
import Column from './column'

const getAlignment = (config) => {
  if(!config) return {}
  const { align } = config
  if(!align) return {}
  if(align === 'left') return { margin: '0 auto 0 0' }
  if(align === 'center') return { margin: '0 auto' }
  if(align === 'right') return { margin: '0 0 0 auto' }
}

const getSizing = (config) => {
  if(!config) return {}
  const { customWidth, fullWidth } = config
  return { flex: fullWidth ? 1 : `0 0 ${withUnits(customWidth || 980)}` }
}

export default function Row(config, row, sindex, rindex) {

  const namespace = `.s${sindex}r${rindex}`

  config.all.push({
    selector: `${namespace} .r`,
    properties: {
      ...getBackground(row.background),
      ...getSpacing(row.spacing),
      ...getBorder(row.border),
      ...getAlignment(row.alignment)
    }
  })

  config.desktop.push({
    selector: `${namespace} .r`,
    properties: {
      ...getSizing(row.sizing)
    }
  })

  config = row.columns.reduce((config, column, cindex) => {
    return Column(config, column, sindex, rindex, cindex)
  }, config)

  return config

}
