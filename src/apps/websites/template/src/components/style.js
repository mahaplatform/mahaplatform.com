import _ from 'lodash'

const getValue = (property, value) => {
  return value
}

const getStyle = (selector, properties) => {
  const definition = Object.keys(properties).map(property => {
    return `${_.kebabCase(property)}:${getValue(property, properties[property])};`
  })
  return `${selector}{${definition}}`
}

const getStyles = (definitions) => {
  return definitions.map(definition => {
    return getStyle(definition.selector, definition.properties)
  }).join('')
}

const getMediaStyle = (config, type) => {
  if(!config[type]) return []
  const medias = {
    all: (styles) => styles,
    tablet: (styles) => `@media only screen and (min-width: 769px) and (max-width: 1024px){${styles}}`,
    mobile: (styles) => `@media only screen and (max-width: 768px){${styles}}`
  }
  return medias[type](getStyles(config[type]))
}

const getMediaStyles = (config) => [
  ...getMediaStyle(config, 'all'),
  ...getMediaStyle(config, 'tablet'),
  ...getMediaStyle(config, 'mobile')
].join('')

export default function Style({ site, page }) {

  const config = {
    all: [
      {
        selector: 'body',
        properties: { backgroundColor: 'blue' }
      }
    ],
    tablet: [
      {
        selector: 'body',
        properties: { backgroundColor: 'green' }
      }
    ],
    mobile: [
      {
        selector: 'body',
        properties: { backgroundColor: 'red' }
      }
    ]
  }

  const style = {
    __html: getMediaStyles(config)
  }

  return <style dangerouslySetInnerHTML={ style } />

}
