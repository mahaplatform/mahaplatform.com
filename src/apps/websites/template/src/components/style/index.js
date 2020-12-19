import postcssMergeRules from 'postcss-merge-rules'
import Section from './section'
import postcss from 'postcss'
import _ from 'lodash'

const getValue = (property, value) => {
  return value
}

const getStyle = (selector, properties) => {
  const keys = Object.keys(properties)
  if(keys.length == 0) return ''
  const definition = keys.map(key => {
    return `${_.kebabCase(key)}:${getValue(key, properties[key])}`
  }).join(';')
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
    retina: (styles) => `@media (-webkit-min-device-pixel-ratio: 2),(min-resolution: 192dpi){${styles}}`,
    desktop: (styles) => `@media all and (min-width: 981px){${styles}}`,
    tablet: (styles) => `@media all and (max-width: 980px){${styles}}`,
    mobile: (styles) => `@media all and (max-width: 767px){${styles}}`
  }
  const styles = getStyles(config[type])
  return styles.length > 0 ? medias[type](styles) : styles
}

const getMediaStyles = (config) => [
  ...getMediaStyle(config, 'all'),
  ...getMediaStyle(config, 'retina'),
  ...getMediaStyle(config, 'desktop'),
  ...getMediaStyle(config, 'tablet'),
  ...getMediaStyle(config, 'mobile')
].join('')

export default function Style({ site, layout, page }) {

  const config = page.sections.reduce((config, section, sindex) => {
    return Section(site, config, section, `.p${sindex}`)
  }, layout.sections.reduce((config, section, sindex) => {
    return Section(site, config, section, `.l${sindex}`)
  }, { all: [], retina: [], desktop: [], tablet: [], mobile: [] }))

  const styles = getMediaStyles(config)

  const __html = postcss([
    postcssMergeRules()
  ]).process(styles).toString()

  return <style dangerouslySetInnerHTML={{ __html }} />

}
