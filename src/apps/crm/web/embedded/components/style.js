import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const selectors = [
  { selector: 'h1', blocks: ['h1'] },
  { selector: 'h2', blocks: ['h2'] },
  { selector: 'p', blocks: ['p','li','input','textarea','.dropdown .item','label','.field-instructions','.maha-checkbox-label'] }
]

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
    return !_.isNil(value) ? [{ prop, value: `url('/imagecache/w=1920&h=1080${value}')` }] : []
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
        ...this._getProp('flex', 'cover.width'),
        ...this._getImage('background-image', 'cover.image'),
        ...this._getProp('background-position', 'cover.image_justification'),
        ...this._getProp('order', 'cover.position')
      ] },
      { selector: 'div.maha-form-layout-image-caption', styles: [
        ...this._getProp('background-color', 'cover.background_color')
      ] },
      { selector: 'div.maha-form-layout-image-caption p', styles: [
        ...this._getProp('font-family', 'cover.font_family'),
        ...this._getProp('font-size', 'cover.font_size', 'px'),
        ...this._getFormat('font-weight', 'bold', 'cover.format', 'normal'),
        ...this._getFormat('font-style', 'italic', 'cover.format'),
        ...this._getFormat('text-decoration', 'underline', 'cover.format'),
        ...this._getProp('color', 'cover.color'),
        ...this._getProp('text-align', 'cover.text_align'),
        ...this._getProp('line-height', 'cover.line_height'),
        ...this._getProp('letter-spacing', 'cover.letter_spacing', 'px')
      ] },
      { selector: 'div.maha-form-layout-image-caption a', styles: [
        ...this._getProp('color', 'cover.color')
      ] },
      { selector: 'div.maha-form-layout-content', styles: [
        ...this._getProp('background-color', 'page.background_color')
      ] },
      { selector: 'div.maha-form', styles: [
        ...this._getProp('background-color', 'form.background_color')
      ] },
      ...selectors.reduce((selectorStyles, style) => [
        ...selectorStyles,
        ...style.blocks.reduce((blockStyles, block) => [
          ...blockStyles,
          {
            selector: `div.maha-form ${block}`, styles: [
              ...this._getProp('font-family', `page.${style.selector}_font_family`),
              ...this._getProp('font-size', `page.${style.selector}_font_size`, 'px'),
              ...this._getFormat('font-weight', 'bold', `page.${style.selector}_format`, 'normal'),
              ...this._getFormat('font-style', 'italic', `page.${style.selector}_format`),
              ...this._getFormat('text-decoration', 'underline', `page.${style.selector}_format`),
              ...this._getProp('color', `page.${style.selector}_color`),
              ...this._getProp('text-align', `page.${style.selector}_text_align`),
              ...this._getProp('line-height', `page.${style.selector}_line_height`),
              ...this._getProp('letter-spacing', `page.${style.selector}_letter_spacing`, 'px')
            ]
          }
        ], [])
      ], []),
      ...['header','body','footer'].reduce((sectionStyles, section) => [
        ...sectionStyles,
        ...selectors.reduce((selectorStyles, style) => [
          ...selectorStyles,
          ...style.blocks.reduce((blockStyles, block) => [
            ...blockStyles,
            {
              selector: `div.maha-form-${section} ${block}`, styles: [
                ...this._getProp('font-family', `${section}.${style.selector}_font_family`),
                ...this._getProp('font-size', `${section}.${style.selector}_font_size`, 'px'),
                ...this._getFormat('font-weight', 'bold', `${section}.${style.selector}_format`, 'normal'),
                ...this._getFormat('font-style', 'italic', `${section}.${style.selector}_format`),
                ...this._getFormat('text-decoration', 'underline', `${section}.${style.selector}_format`),
                ...this._getProp('color', `${section}.${style.selector}_color`),
                ...this._getProp('text-align', `${section}.${style.selector}_text_align`),
                ...this._getProp('line-height', `${section}.${style.selector}_line_height`),
                ...this._getProp('letter-spacing', `${section}.${style.selector}_letter_spacing`, 'px')
              ]
            }
          ], [])
        ], [])
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
          },
          ...selectors.reduce((selectorStyles, style) => [
            ...selectorStyles,
            ...style.blocks.reduce((blockStyles, block) => [
              ...blockStyles,
              {
                selector: `div.field-${i} ${block}`, styles: [
                  ...this._getProp('font-family', `fields[${i}].${style.selector}_font_family`),
                  ...this._getProp('font-size', `fields[${i}].${style.selector}_font_size`, 'px'),
                  ...this._getFormat('font-weight', 'bold', `fields[${i}].${style.selector}_format`, 'normal'),
                  ...this._getFormat('font-style', 'italic', `fields[${i}].${style.selector}_format`),
                  ...this._getFormat('text-decoration', 'underline', `fields[${i}].${style.selector}_format`),
                  ...this._getProp('color', `fields[${i}].${style.selector}_color`),
                  ...this._getProp('text-align', `fields[${i}]age.${style.selector}_text_align`),
                  ...this._getProp('line-height', `fields[${i}].${style.selector}_line_height`),
                  ...this._getProp('letter-spacing', `fields[${i}].${style.selector}_letter_spacing`, 'px')
                ]
              }
            ], [])
          ], [])
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
