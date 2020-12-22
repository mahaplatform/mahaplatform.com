import Section from './section'
import React from 'react'
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

const getMediaQuery = (device, resolution, styles) => {
  if(device === 'all' && resolution == 'standard') return styles
  const params = {
    standard: 'all',
    retina: '(-webkit-min-device-pixel-ratio: 2),(min-resolution: 192dpi)',
    desktop: '(min-width: 981px)',
    tablet: '(max-width: 980px)',
    mobile: '(max-width: 767px)'
  }
  if(device === 'all') {
    if(resolution === 'standard') return styles
    if(resolution === 'retina') return `@media ${params[resolution]}{${styles}}`
  }
  return `@media ${params[resolution]} and ${params[device]}{${styles}}`
}

const renderMediaRules = (ruleset, device, resolution) => {
  const styles = getRules(ruleset[device][resolution])
  return styles.length > 0 ? getMediaQuery(device,resolution,styles) : styles
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
  }, {
    all: { standard: [], retina: [] },
    desktop: { standard: [], retina: [] },
    tablet: { standard: [], retina: [] },
    mobile: { standard: [], retina: [] }
  })
}

const mergeRules = (rules) => {
  return Object.keys(rules).reduce((merged, device) => ({
    ...merged,
    [device]: Object.keys(rules[device]).reduce((merged2, resolution) => ({
      ...merged2,
      [resolution]: rules[device][resolution].reduce((merged3, rule) => {
        if(!rule.properties) return merged3
        const index = merged3.findIndex(rule2 => {
          return _.isEqual(rule.properties, rule2.properties)
        })
        if(index >= 0) {
          merged3[index].selector += `,${rule.selector}`
          return merged3
        }
        return [
          ...merged3,
          rule
        ]
      }, [])
    }), {})
  }), {})
}

const render = (rules) => [
  ...renderMediaRules(rules, 'all', 'standard'),
  ...renderMediaRules(rules, 'all', 'retina'),
  ...renderMediaRules(rules, 'desktop', 'standard'),
  ...renderMediaRules(rules, 'desktop', 'retina'),
  ...renderMediaRules(rules, 'tablet', 'standard'),
  ...renderMediaRules(rules, 'tablet', 'retina'),
  ...renderMediaRules(rules, 'mobile', 'standard'),
  ...renderMediaRules(rules, 'mobile', 'retina')
].join('')

export default function Style({ site, layout, page }) {

  const sections = mergeSections(layout, page)

  const rules = parseRules(site, sections)

  const merged = mergeRules(rules)

  const css = render(merged)

  return <style dangerouslySetInnerHTML={{ __html: css }} />

}
