import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const blocks = ['h1','h2','p','li','input','textarea','.dropdown .item','label','.field-instructions','.maha-checkbox-label','.ui.button']

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

  _getImage(prop, key) {
    const { config } = this.props
    const value = _.get(config, key)
    return !_.isNil(value) ? [{ prop, value: `url('/imagecache${value}')` }] : []
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
    const { config } = this.props
    const { fields } = config
    const styles = [
      { selector: 'div.maha-form-layout-image', styles: [
        ...this._getProp('flex', 'page.cover_image_width'),
        ...this._getImage('background-image', 'page.cover_image'),
        ...this._getProp('background-position', 'page.cover_image_justification'),
        ...this._getProp('order', 'page.cover_image_position')
      ] },
      { selector: 'div.maha-form-layout-content', styles: [
        ...this._getProp('background-color', 'page.background_color')
      ] },
      { selector: 'div.maha-form', styles: [
        ...this._getProp('background-color', 'page.form_background_color'),
        ...this._getProp('max-width', 'page.form_width')

      ] },
      ...['header','body','footer'].reduce((styles, section) => [
        ...styles,
        ...blocks.map(block => ({
          selector: `div.maha-form-${section} ${block}`, styles: [
            ...this._getProp('font-family', `${section}.font_family`),
            ...this._getFormat('font-weight', 'bold', `${section}.format`, 'normal'),
            ...this._getFormat('font-style', 'italic', `${section}.format`),
            ...this._getFormat('text-decoration', 'underline', `${section}.format`),
            ...this._getProp('color', `${section}.color`),
            ...this._getProp('text-align', `${section}.text_align`),
            ...this._getProp('line-height', `${section}.line_height`),
            ...this._getProp('letter-spacing', `${section}.letter_spacing`, 'px')
          ]
        }))
      ], []),
      ...['header','body','footer'].map(section => ({
        selector: `div.maha-form-${section}`, styles: [
          ...this._getProp('background-color', `${section}.background_color`)
        ]
      })),
      { selector: '.maha-form-header', styles: [
        ...this._getProp('background-color', 'header.background_color'),
        ...this._getProp('font-family','header.font_family'),
        ...this._getProp('font-size','header.font_size', 'px'),
        ...this._getFormat('font-weight', 'bold', 'header.format', 'normal'),
        ...this._getFormat('font-style', 'italic', 'header.format'),
        ...this._getFormat('text-decoration', 'underline', 'header.format'),
        ...this._getProp('color','header.color'),
        ...this._getProp('text-align','header.text_align'),
        ...this._getProp('line-height','header.line_height'),
        ...this._getProp('letter-spacing','header.letter_spacing', 'px')
      ] },
      { selector: '.maha-form-footer', styles: [
        ...this._getProp('background-color', 'footer.background_color'),
        ...this._getProp('font-family','footer.font_family'),
        ...this._getProp('font-size','footer.font_size', 'px'),
        ...this._getFormat('font-weight', 'bold', 'footer.format', 'normal'),
        ...this._getFormat('font-style', 'italic', 'footer.format'),
        ...this._getFormat('text-decoration', 'underline', 'footer.format'),
        ...this._getProp('color','footer.color'),
        ...this._getProp('text-align','footer.text_align'),
        ...this._getProp('line-height','footer.line_height'),
        ...this._getProp('letter-spacing','footer.letter_spacing', 'px')
      ] },
      ...fields.reduce((styles, field, i) => [
        ...styles,
        ...field.type === 'text' ? [
          {
            selector: `div.field-${i}`, styles: [
              ...this._getProp('background-color',`fields[${i}].background_color`),
              ...this._getBorder('border', `fields[${i}].border`),
              ...this._getProp('padding',`fields[${i}].padding`, 'px')
            ]
          }, {
            selector: `div.field-${i} a`, styles: [
              ...this._getProp('color',`fields[${i}].color`),
              { prop: 'text-decoration', value: 'underline' }
            ]
          }, {
            selector: `div.field-${i} h1,div.field-${i} h2,div.field-${i} p,div.field-${i} li`, styles: [
              ...this._getProp('font-family',`fields[${i}].font_family`),
              ...this._getProp('font-size',`fields[${i}].font_size`, 'px'),
              ...this._getFormat('font-weight', 'bold', `fields[${i}].format`, 'normal'),
              ...this._getFormat('font-style', 'italic', `fields[${i}].format`),
              ...this._getFormat('text-decoration', 'underline', `fields[${i}].format`),
              ...this._getProp('color',`fields[${i}].color`),
              ...this._getProp('text-align',`fields[${i}].text_align`),
              ...this._getProp('line-height',`fields[${i}].line_height`),
              ...this._getProp('letter-spacing',`fields[${i}].letter_spacing`, 'px')
            ]
          }
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
