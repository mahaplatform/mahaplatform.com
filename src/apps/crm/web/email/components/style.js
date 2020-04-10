import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const sections = ['header', 'body', 'footer']

const selectors = [
  { selector: 'h1', blocks: ['h1'] },
  { selector: 'h2', blocks: ['h2'] },
  { selector: 'p', blocks: ['p','li','td'] }
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
    return [
      { selector: 'html', styles: [
        ...this._getProp('background-color', 'page.background_color')
      ] },
      { selector: 'table.body', styles: [
        ...this._getProp('background-color', 'page.background_color')
      ] },
      ...selectors.reduce((selectorStyles, style) => [
        ...selectorStyles,
        ...style.blocks.reduce((blockStyles, block) => [
          ...blockStyles,
          {
            selector: block, styles: [
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
      { selector: 'a', styles: [
        ...this._getFormat('font-weight', 'bold', 'page.a_format', 'normal'),
        ...this._getFormat('font-style', 'italic', 'page.a_format'),
        ...this._getFormat('text-decoration', 'underline', 'page.a_format'),
        ...this._getProp('color', 'page.a_color')
      ] },
      { selector: 'table.body', styles: [
        ...this._getProp('background-color', 'page.background_color')
      ] },
      { selector: 'table.body>tbody>tr>td.float-center', styles: [
        ...this._getProp('padding', 'page.padding', 'px')
      ] },
      { selector: 'table.container', styles: [
        ...this._getProp('background', 'page.email_background_color', null, 'none'),
        ...this._getBorder('border', 'page.email_border')
      ] },
      ...sections.reduce((sectionStyles, section, i) => [
        ...sectionStyles,
        { selector: `table.section-${section}`, styles: [
          ...this._getProp('background', `${section}.background_color`, null, 'none')
        ] },
        ...config[section].blocks.reduce((blockStyles, block, j) => [
          ...blockStyles,
          ...selectors.reduce((selectorStyles, style) => [
            ...selectorStyles,
            ...style.blocks.reduce((blockStyles, block) => [
              ...blockStyles,
              {
                selector: `table.section-${section} table.block-${j} ${block}`, styles: [
                  ...this._getProp('font-family', `${section}.blocks[${j}].${style.selector}_font_family`),
                  ...this._getProp('font-size', `${section}.blocks[${j}].${style.selector}_font_size`, 'px'),
                  ...this._getFormat('font-weight', 'bold', `${section}.blocks[${j}].${style.selector}_format`, 'normal'),
                  ...this._getFormat('font-style', 'italic', `${section}.blocks[${j}].${style.selector}_format`),
                  ...this._getFormat('text-decoration', 'underline', `${section}.blocks[${j}].${style.selector}_format`),
                  ...this._getProp('color', `${section}.blocks[${j}].${style.selector}_color`),
                  ...this._getProp('text-align', `${section}.blocks[${j}].${style.selector}_text_align`),
                  ...this._getProp('line-height', `${section}.blocks[${j}].${style.selector}_line_height`),
                  ...this._getProp('letter-spacing', `${section}.blocks[${j}].${style.selector}_letter_spacing`, 'px')
                ]
              }
            ], [])
          ], []),
          { selector: `table.section-${section} table.block-${j} a`, styles: [
            ...this._getFormat('font-weight', 'bold', `${section}.blocks[${j}].a_format`, 'normal'),
            ...this._getFormat('font-style', 'italic', `${section}.blocks[${j}].a_format`),
            ...this._getFormat('text-decoration', 'underline', `${section}.blocks[${j}].a_format`),
            ...this._getProp('color', `${section}.blocks[${j}].a_color`)
          ] },
          {
            selector: `table.section-${section} table.block-${j} table.block-container`, styles: [
              ...this._getBorder('border', `${section}.blocks[${j}].border`),
              ...this._getProp('background-color',`${section}.blocks[${j}].background_color`)
            ]
          }, {
            selector: `table.section-${section} table.block-${j} .block-container-cell`, styles: [
              ...this._getProp('padding',`${section}.blocks[${j}].padding`, 'px')
            ]
          },
          ...block.type === 'images' ? [
            {
              selector: `table.section-${section} table.block-${j} td.image`, styles: [
                ...this._getProp('padding',`${section}.blocks[${j}].image_padding`, 'px')
              ]
            }, {
              selector: `table.section-${section} table.block-${j} img`, styles: [
                ...this._getBorder('border', `${section}.blocks[${j}].image_border`),
                ...this._getProp('border-radius',`${section}.blocks[${j}].image_border_radius`, 'px')
              ]
            }
          ] : [],
          ..._.includes(['image','video'], block.type) ? [
            {
              selector: `table.section-${section} table.block-${j} table.block-container .block-caption div`, styles: [
                ...this._getProp('background-color',`${section}.blocks[${j}].caption_background_color`),
                ...this._getProp('padding',`${section}.blocks[${j}].caption_padding`, 'px')
              ]
            }, {
              selector: `table.section-${section} table.block-${j} img`, styles: [
                ...this._getBorder('border', `${section}.blocks[${j}].image_border`),
                ...this._getProp('border-radius',`${section}.blocks[${j}].image_border_radius`, 'px')
              ]
            }
          ] : [],
          ...block.type === 'button' ? [
            {
              selector: `table.section-${section} table.block-${j} table.button table td`, styles: [
                ...this._getProp('background-color',`${section}.blocks[${j}].button_background_color`),
                ...this._getProp('padding',`${section}.blocks[${j}].button_padding`, 'px'),
                ...this._getProp('border-radius',`${section}.blocks[${j}].button_border_radius`, 'px')
              ]
            },
            {
              selector: `table.section-${section} table.block-${j} table.button table a`, styles: [
                ...this._getProp('font-family',`${section}.blocks[${j}].font_family`),
                ...this._getProp('font-size',`${section}.blocks[${j}].font_size`, 'px'),
                ...this._getProp('line-height', `${section}.blocks[${j}].line_height`),
                ...this._getProp('letter-spacing',`${section}.blocks[${j}].letter_spacing`, 'px'),
                ...this._getProp('text-align',`${section}.blocks[${j}].text_align`),
                ...this._getFormat('font-weight', 'bold', `${section}.blocks[${j}].format`, 'normal'),
                ...this._getFormat('font-style', 'italic', `${section}.blocks[${j}].format`),
                ...this._getFormat('text-decoration', 'underline', `${section}.blocks[${j}].format`),
                ...this._getProp('color',`${section}.blocks[${j}].color`)
              ]
            }
          ] : [],
          ..._.includes(['follow','share'], block.type) ? [
            {
              selector: `table.section-${section} table.block-${j} table.social table`, styles: [
                ...this._getProp('background-color',`${section}.blocks[${j}].button_background_color`),
                ...this._getProp('border-radius',`${section}.blocks[${j}].button_border_radius`, 'px')
              ]
            },{
              selector: `table.section-${section} table.block-${j} td.social-${block.type}-service td`, styles: [
                ...this._getProp('font-family',`${section}.blocks[${j}].font_family`),
                ...this._getProp('font-size',`${section}.blocks[${j}].font_size`, 'px'),
                ...this._getFormat('font-weight', 'bold', `${section}.blocks[${j}].format`, 'normal'),
                ...this._getFormat('font-style', 'italic', `${section}.blocks[${j}].format`),
                ...this._getFormat('text-decoration', 'underline', `${section}.blocks[${j}].format`),
                ...this._getProp('color',`${section}.blocks[${j}].color`),
                ...this._getProp('text-align',`${section}.blocks[${j}].text_align`),
                ...this._getProp('line-height',`${section}.blocks[${j}].line_height`),
                ...this._getProp('letter-spacing',`${section}.blocks[${j}].letter_spacing`, 'px')
              ]
            }
          ] : [],
          ...block.type === 'divider' ? [
            {
              selector: `table.section-${section} table.block-${j} div.divider`, styles: [
                ...this._getProp('border-width',`${section}.blocks[${j}].divider_border_width`, 'px'),
                ...this._getProp('border-style',`${section}.blocks[${j}].divider_border_style`),
                ...this._getProp('border-color',`${section}.blocks[${j}].divider_border_color`)
              ]
            }
          ] : []
        ], [])
      ], [])
    ].map(item => item.styles.length === 0 ? '' : `
      ${item.selector} {
        ${ item.styles.map(style => `${style.prop}: ${style.value} !important;`).join('\n') }
      }
    `).join('\n')
  }

}

export default Style
