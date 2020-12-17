import Column from './column'
const getAlignment = ({ align }) => {
  if(!align) return {}
  if(align === 'left') return { margin: '0 auto 0 0' }
  if(align === 'center') return { margin: '0 auto' }
  if(align === 'right') return { margin: '0 0 0 auto' }
}

const getSizing = ({ customWidth, fullWidth }) => {
  if(fullWidth) return { flex: 1 }
  if(customWidth) return { flex: `0 0 ${customWidth}px` }
  return { flex: '0 0 980px' }
}

const getBackground = (config) => {
  if(!config) return {}
  const { color } = config
  const properties = {}
  if(color) properties.backgroundColor = color
  return properties
}

const getSpacing = (config) => {
  if(!config) return {}
  const { margin, padding } = config
  const properties = {}
  if(margin) properties.margin = `${margin}px`
  if(padding) properties.padding = `${padding}px`
  return properties
}

const getBorder = (config) => {
  if(!config) return {}
  const { radius, style, width, color } = config
  const properties = {}
  if(radius) properties.borderRadius = `${radius}px`
  if(style) properties.borderStyle = style
  if(width) properties.borderWidth = `${width}px`
  if(color) properties.borderColor = color
  return properties
}

export default function Row(config, row, rindex) {

  const namespace = `.r${rindex}`

  config.all.push({
    selector: `${namespace} .rc`,
    properties: {
      ...getAlignment(row.alignment)
    }
  })

  config.desktop.push({
    selector: `${namespace} .rc`,
    properties: {
      ...getSizing(row.sizing)
    }
  })

  config.all.push({
    selector: `${namespace} .r`,
    properties: {
      ...getBackground(row.background),
      ...getSpacing(row.spacing),
      ...getBorder(row.border)
    }
  })

  config = row.columns.reduce((config, column, cindex) => {
    return Column(config, column, rindex, cindex)
  }, config)

  return config

}
