import Section from './section'
import _ from 'lodash'

const getValue = (property, value) => {
  return value
}

const getRule = (selector, properties) => {
  const keys = Object.keys(properties)
  if(keys.length == 0) return ''
  const declaration = keys.map(key => {
    return `${_.kebabCase(key)}:${getValue(key, properties[key])}`
  }).join(';')
  return `${selector}{${declaration}}`
}

const getRules = (rules) => {
  return rules.map(rule => {
    return getRule(rule.selector, rule.properties)
  }).join('')
}

const getMediaRules = (config, type) => {
  const medias = {
    all: (styles) => styles,
    retina: (styles) => `@media (-webkit-min-device-pixel-ratio: 2),(min-resolution: 192dpi){${styles}}`,
    desktop: (styles) => `@media all and (min-width: 981px){${styles}}`,
    tablet: (styles) => `@media all and (max-width: 980px){${styles}}`,
    mobile: (styles) => `@media all and (max-width: 767px){${styles}}`
  }
  const styles = getRules(config[type])
  return styles.length > 0 ? medias[type](styles) : styles
}

const mergeSections = (layout, page) => {
  return [
    ...layout.sections.map((section, index) => {
      return { prefix: `.l${index}`, section }
    }),
    ...page.sections.map((section, index) => {
      return { prefix: `.p${index}`, section }
    })
  ]
}

const parseRules = (site, sections) => {
  return sections.reduce((rules, section) => {
    return Section(site, rules, section.section, section.prefix)
  }, { all: [], retina: [], desktop: [], tablet: [], mobile: [] })
}

const mergeRules = (rules) => {
  return Object.keys(rules).reduce((merged, media) => ({
    ...merged,
    [media]: rules[media].reduce((merged2, rule) => {
      const index = merged2.findIndex(rule2 => {
        return _.isEqual(rule.properties, rule2.properties)
      })
      if(index >= 0) {
        merged2[index].selector += `,${rule.selector}`
        return merged2
      }
      return [
        ...merged2,
        rule
      ]
    }, [])
  }), {})
}

const render = (rules) => {

  const mediarules = [
    ...getMediaRules(rules, 'all'),
    ...getMediaRules(rules, 'retina'),
    ...getMediaRules(rules, 'desktop'),
    ...getMediaRules(rules, 'tablet'),
    ...getMediaRules(rules, 'mobile')
  ]

  return <style dangerouslySetInnerHTML={{ __html: mediarules.join('') }} />

}

export default function Style({ site, layout, page }) {

  const sections = mergeSections(layout, page)

  const rules = parseRules(site, sections)

  const merged = mergeRules(rules)

  return render(merged)

}
