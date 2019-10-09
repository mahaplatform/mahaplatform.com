import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Style extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <style type="text/css">
        { this._getStyle() }
      </style>
    )
  }

  _getProp(prop, key, unit = null, defaultValue = null) {
    const { config } = this.props
    const value = _.get(config, key)
    const adjusted = !_.isNil(value) ? value : defaultValue
    const formatted = unit ? `${adjusted}${unit}` : value
    return !_.isNil(value) ? [{ prop, value: formatted }] : []
  }

  _getFormat(prop, targetValue, key, defaultValue) {
    const { config } = this.props
    const formats = _.get(config, key) || []
    const selected = _.includes(formats, targetValue)
    const value = selected ? targetValue : defaultValue
    return selected ? [{ prop, value }] : []
  }

  _getBorder(prop, key) {
    const { config } = this.props
    const width = _.get(config, `${key}_width`)
    const style = _.get(config, `${key}_style`)
    const color = _.get(config, `${key}_color`)
    if(!_.isNil(width) && !_.isNil(style) && !_.isNil(color)) {
      return [{ prop, value: `${width}px ${style} ${color}` }]
    }
    return []
  }

  _getStyle() {
    // const { config } = this.props
    // const { sections } = config
    const styles = [
      { selector: '.document', styles: [
        ...this._getProp('background-color', 'page.background_color'),
        ...this._getProp('padding-top', 'page.padding_top', 'px'),
        ...this._getProp('padding-right', 'page.padding_right', 'px'),
        ...this._getProp('padding-bottom', 'page.padding_bottom', 'px'),
        ...this._getProp('padding-left', 'page.padding_left', 'px')
      ] },
      ...['h1','h2','h3','h4','p'].map(selector => ({
        selector, styles: [
          ...this._getProp('font-family', `page.${selector}_font_family`),
          ...this._getProp('font-size', `page.${selector}_font_size`),
          ...this._getFormat('font-weight', 'bold', `page.${selector}_format`, 'normal'),
          ...this._getFormat('font-style', 'italic', `page.${selector}_format`),
          ...this._getFormat('text-decoration', 'underline', `page.${selector}_format`),
          ...this._getProp('color', `page.${selector}_color`),
          ...this._getProp('text-align', `page.${selector}_text_align`),
          ...this._getProp('line-height', `page.${selector}_line_height`),
          ...this._getProp('letter-spacing', `page.${selector}_letter_spacing`)
        ]
      }))
    ]
    return styles.map(item => item.styles.length === 0 ? '' : `
      ${item.selector} {
        ${ item.styles.map(style => `${style.prop}: ${style.value};`).join('\n') }
      }`).join('\n')
  }

}

export default Style
