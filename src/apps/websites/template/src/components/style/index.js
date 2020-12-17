import Row from './row'
import _ from 'lodash'

const getValue = (property, value) => {
  return value
}

const getStyle = (selector, properties) => {
  const definition = Object.keys(properties).map(property => {
    return `${_.kebabCase(property)}:${getValue(property, properties[property])};`
  }).join('')
  return `${selector}{${definition}}`
}

const getStyles = (definitions) => {
  return definitions.map(definition => {
    return getStyle(definition.selector, definition.properties)
  }).join('')
}

const getMediaStyle = (config, type) => {
  const medias = {
    all: (styles) => styles,
    desktop: (styles) => `@media all and (min-width: 981px){${styles}}`,
    tablet: (styles) => `@media all and (max-width: 980px){${styles}}`,
    mobile: (styles) => `@media all and (max-width: 767px){${styles}}`
  }
  const styles = getStyles(config[type])
  return styles.length > 0 ? medias[type](styles) : styles
}

const getMediaStyles = (config) => [
  ...getMediaStyle(config, 'all'),
  ...getMediaStyle(config, 'desktop'),
  ...getMediaStyle(config, 'tablet'),
  ...getMediaStyle(config, 'mobile')
].join('')

export default function Style({ site, page }) {

  const config = page.rows.reduce((config, row, rindex) => {
    return Row(config, row, rindex)
  }, { all: [], desktop: [], tablet: [], mobile: [] })

  const style = {
    __html: getMediaStyles(config)
  }

  return <style dangerouslySetInnerHTML={ style } />

}
