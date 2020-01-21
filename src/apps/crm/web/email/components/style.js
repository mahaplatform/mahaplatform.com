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
    const { config } = this.props
    const { sections } = config
    const styles = [
      { selector: 'html', styles: [
        ...this._getProp('background-color', 'page.background_color')
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
      })),
      { selector: 'table.body', styles: [
        ...this._getProp('background-color', 'page.background_color'),
        ...this._getBorder('border-top', 'page.border_top')
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
        { selector: `table.section-${i}`, styles: [
          ...this._getProp('background-color', `sections[${i}].background_color`),
          ...this._getBorder('border-top', `sections[${i}].border_top`),
          ...this._getBorder('border-bottom', `sections[${i}].border_bottom`),
          ...this._getProp('padding-top', `sections[${i}].padding_top`, 'px'),
          ...this._getProp('padding-bottom', `sections[${i}].padding_bottom`, 'px')
        ] },
        { selector: `table.section-${i} td,table.section-${i} p`, styles: [
          ...this._getProp('font-family',`sections[${i}].font_family`),
          ...this._getProp('font-size',`sections[${i}].font_size`),
          ...this._getProp('color',`sections[${i}].color`),
          ...this._getProp('text-align',`sections[${i}].text_align`),
          ...this._getProp('line-height',`sections[${i}].line_height`),
          ...this._getProp('letter-spacing',`sections[${i}].letter_spacing`)
        ] },
        { selector: `table.section-${i} td a`, styles: [
          ...this._getProp('color',`sections[${i}].color`)
          // bold
          // underline
        ] },
        ...sections[i].blocks.reduce((blockStyles, block, j) => [
          ...blockStyles,
          { selector: `table.section-${i}-block-${j} td,table.section-${i}-block-${j} p`, styles: [
            ...this._getProp('font-family',`sections[${i}].blocks[${j}].font_family`),
            ...this._getProp('font-size',`sections[${i}].blocks[${j}].font_size`),
            ...this._getFormat('font-weight', 'bold', `sections[${i}].blocks[${j}].format`, 'normal'),
            ...this._getFormat('font-style', 'italic', `sections[${i}].blocks[${j}].format`),
            ...this._getFormat('text-decoration', 'underline', `sections[${i}].blocks[${j}].format`),
            ...this._getProp('color',`sections[${i}].blocks[${j}].color`),
            ...this._getProp('text-align',`sections[${i}].blocks[${j}].text_align`),
            ...this._getProp('line-height',`sections[${i}].blocks[${j}].line_height`),
            ...this._getProp('letter-spacing',`sections[${i}].blocks[${j}].letter_spacing`)
          ] },
          ...block.type === 'button' ? [
            {
              selector: `table.section-${i}-block-${j} table.button table td`,styles: [
                ...this._getProp('background-color',`sections[${i}].blocks[${j}].background_color`),
                ...this._getProp('padding',`sections[${i}].blocks[${j}].padding`, 'px'),
                ...this._getProp('border',`sections[${i}].blocks[${j}].border`),
                ...this._getProp('border-radius',`sections[${i}].blocks[${j}].border_radius`, 'px'),
                ...this._getProp('text-align',`sections[${i}].blocks[${j}].text_align`)
              ]
            },{
              selector: `table.section-${i}-block-${j} table.button td`,styles: [
                ...this._getProp('font-family',`sections[${i}].blocks[${j}].font_family`),
                ...this._getProp('font-size',`sections[${i}].blocks[${j}].font_size`),
                ...this._getProp('letter-spacing',`sections[${i}].blocks[${j}].letter_spacing`),
                ...this._getProp('text-align',`sections[${i}].blocks[${j}].text_align`),
                ...this._getProp('color',`sections[${i}].blocks[${j}].color`)
              ]
            }
          ] : [],
          ..._.includes(['follow','share'], block.type) ? [
            {
              selector: `table.section-${i}-block-${j}`,styles: [
                ...this._getProp('background-color',`sections[${i}].blocks[${j}].background_color`)
              ]
            },{
              selector: 'table.social table',styles: [
                ...this._getProp('background-color',`sections[${i}].blocks[${j}].button_background_color`),
                ...this._getProp('border-radius',`sections[${i}].blocks[${j}].button_border_radius`, 'px')
              ]
            }
          ] : [],
          ...block.type === 'divider' ? [
            {
              selector: `table.section-${i}-block-${j} td`,styles: [
                ...this._getProp('padding-top',`sections[${i}].blocks[${j}].padding_top`),
                ...this._getProp('padding-bottom',`sections[${i}].blocks[${j}].padding_bottom`),
                ...this._getProp('background-color',`sections[${i}].blocks[${j}].background_color`)
              ]
            },{
              selector: `table.section-${i}-block-${j} div.divider`,styles: [
                ...this._getProp('border',`sections[${i}].blocks[${j}].border`)
              ]
            }
          ] : []
        ], [])
      ], [])
    ]
    return styles.map(item => item.styles.length === 0 ? '' : `
      ${item.selector} {
        ${ item.styles.map(style => `${style.prop}: ${style.value};`).join('\n') }
      }`).join('\n')
  }

}

export default Style
