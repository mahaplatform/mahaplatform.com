import * as options from './variables'
import AlignmentField from '../alignmentfield'
import FormatField from '../formatfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const orientations = [
  { value: 'portrait', text: 'Portrait' },
  { value: 'landscape', text: 'Landscape' }
]

const paper_sizes = [
  { value: 'letter', text: 'Letter (8.5" x 11")' },
  { value: 'tabloid', text: 'Tabloid (11" x 17")' },
  { value: 'legal', text: 'Legal (8.5" x 14")' },
  { value: 'statement', text: 'Statement (5.5" x 8.5")' },
  { value: 'executive', text: 'Executive (7.25" x 10.5")' },
  { value: 'folio', text: 'Folio (8.5" x 13")' },
  { value: 'a3', text: 'A3 (11.69" x 16.54")' },
  { value: 'a4', text: 'A4 (8.27" x 11.69")' },
  { value: 'a5', text: 'A5 (5.83" x 8.27")' },
  { value: 'b4', text: 'B4 (9.84" x 13.9")' },
  { value: 'b5', text: 'B5 (6.93" x 9.84")' }
]

class Page extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleDone = this._handleDone.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Page',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          label: 'Document Style',
          fields: [
            { label: 'Page Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Orientation', name: 'orientation', type: 'lookup', options: orientations, defaultValue: config.orientation },
            { label: 'Paper Size', name: 'paper_size', type: 'lookup', options: paper_sizes, defaultValue: config.paper_size },
            { label: 'Margin Top', name: 'margin_top', type: 'lookup', options: options.paddings, defaultValue: config.margin_top },
            { label: 'Margin Bottom', name: 'margin_bottom', type: 'lookup', options: options.paddings, defaultValue: config.margin_bottom },
            { label: 'Margin Left', name: 'margin_left', type: 'lookup', options: options.paddings, defaultValue: config.margin_left },
            { label: 'Margin Right', name: 'margin_right', type: 'lookup', options: options.paddings, defaultValue: config.margin_right }
          ]
        },
        ...options.block_types.map(({ value, text }) => ({
          label: `${text} Style`,
          fields: [
            { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config[`${value}_font_family`] },
            { label: 'Font Size', name: 'font_size', type: 'lookup', options: options.font_size, defaultValue: config.font_size },
            { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color },
            { label: 'Format', name: `${value}_format`, type: FormatField, defaultValue: config[`${value}_format`] },
            { label: 'Alignment', name: `${value}_text_align`, type: AlignmentField, defaultValue: config[`${value}_text_align`] },
            { label: 'Line Height', name: `${value}_line_height`, type: 'lookup', options: options.line_heights, defaultValue: config[`${value}_line_height`] },
            { label: 'Letter Spacing', name: `${value}_letter_spacing`, type: 'lookup', options: options.letter_spacing, defaultValue: config[`${value}_letter_spacing`] }
          ]
        }))
      ]
    }
  }

  _handleDone() {
    this.props.onPop()
  }

  _handleChange(data) {
    this.props.onUpdate('page', data)
  }

}

export default Page
