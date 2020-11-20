const properties = [
  'backgroundImage','backgroundRepeat','backgroundSize','backgroundColor','backgroundPosition',
  'height',
  'border',
  'fontFamily','fontStyle','fontWeight','color','textAlign','textDecoration',
  'margin','marginTop','marginRight','marginBottom','marginLeft',
  'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
  'transition','transform,'
]

const Style = (tag, config = {}) => {

  const _getElement = (tag, property) => {
    const el = []
    if(tag) el.push(tag)
    el.push(property)
    return el.join('_')
  }

  const _formatValue = (value, property) => {
    if(property === 'backgroundImage') return `url(https://dev.mahaplatform.com:8080/imagecache/${value})`
    return value
  }

  return properties.reduce((styles, property) => {
    const element = _getElement(tag, property)
    const value = config[element]
    return {
      ...styles,
      ...value !== undefined ? {
        [property]: _formatValue(value, property)
      } : {}
    }
  }, {})

}

export default Style
