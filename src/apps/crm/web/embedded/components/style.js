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
    console.log(this.props)
    const { config } = this.props
    const { fields } = config
    const styles = [
      { selector: 'p,li,input,textarea,select,label,.field-instructions,.maha-checkbox-label', styles: [
        ...this._getProp('font-family', 'page.font_family'),
        ...this._getProp('font-size', 'page.font_size', 'px'),
        ...this._getFormat('font-weight', 'bold', 'page.format', 'normal'),
        ...this._getFormat('font-style', 'italic', 'page.format'),
        ...this._getFormat('text-decoration', 'underline', 'page.format'),
        ...this._getProp('color', 'page.color'),
        ...this._getProp('text-align', 'page.text_align'),
        ...this._getProp('line-height', 'page.line_height'),
        ...this._getProp('letter-spacing', 'page.letter_spacing', 'px')
      ] },
      { selector: 'body', styles: [
        ...this._getProp('background-color', 'page.background_color')
      ] },
      { selector: '.maha-form', styles: [
        ...this._getProp('background-color', 'page.form_background_color'),
        ...this._getProp('margin-top', 'page.padding_top', 'px'),
        ...this._getProp('margin-bottom', 'page.padding_bottom', 'px')
      ] },
      { selector: '.maha-form-header', styles: [
        ...this._getProp('background-color', 'header.background_color'),
        ...this._getProp('color', 'header.color')
      ] },
      { selector: '.maha-form-footer', styles: [
        ...this._getProp('background-color', 'footer.background_color'),
        ...this._getProp('color', 'footer.color')
      ] },
      ...fields.reduce((styles, field, i) => [
        ...styles,
        ...field.type === 'text' ? [
          { selector: `div.field-${i}`, styles: [
            ...this._getProp('background-color',`fields[${i}].background_color`),
            ...this._getProp('padding',`fields[${i}].button_padding`, 'px'),
            ...this._getProp('border-radius',`fields[${i}].border_radius`, 'px'),
            ...this._getProp('font-family',`fields[${i}].font_family`),
            ...this._getProp('font-size',`fields[${i}].font_size`, 'px'),
            ...this._getFormat('font-weight', 'bold', `fields[${i}].format`, 'normal'),
            ...this._getFormat('font-style', 'italic', `fields[${i}].format`),
            ...this._getFormat('text-decoration', 'underline', `fields[${i}].format`),
            ...this._getProp('color',`fields[${i}].color`),
            ...this._getProp('text-align',`fields[${i}].text_align`),
            ...this._getProp('line-height',`fields[${i}].line_height`),
            ...this._getProp('letter-spacing',`fields[${i}].letter_spacing`, 'px')
          ] }
        ] : []
      ], [])
    ]
    return styles.map(item => item.styles.length === 0 ? '' : `
      ${item.selector} {
        ${ item.styles.map(style => `${style.prop}: ${style.value} !important;`).join('\n') }
      }`).join('\n')
  }

}

export default Style
