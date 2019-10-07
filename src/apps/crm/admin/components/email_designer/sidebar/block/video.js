import AlignmentField from '../../../alignmentfield'
import FormatField from '../../../formatfield'
import VideoField from '../../../videofield'
import * as options from '../../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const positions = [
  { value: 'top', text: 'Top' },
  { value: 'right', text: 'Right' },
  { value: 'bottom', text: 'Bottom' },
  { value: 'left', text: 'Left' }
]

const alignments = [
  { value: 'left', text: 'Left' },
  { value: 'center', text: 'Center' },
  { value: 'right', text: 'Right' }
]

const widths = [
  { value: 'one_third', text: 'One Third' },
  { value: 'one_half', text: 'One Half' },
  { value: 'two_thirds', text: 'Two Thirds' },
  { value: 'three_quarters', text: 'Three Quarters' }
]

class Video extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Video Block',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      tabs: [
        {
          label: 'Content',
          sections: [
            {
              fields: [
                { name: 'video', type: VideoField, defaultValue: config.video }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              label: 'Text Style',
              fields: [
                { label: 'Font', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
                { type: 'fields', fields: [
                  { label: 'Size', name: 'font_size', type: 'lookup', options: options.font_size, defaultValue: config.font_size },
                  { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color }
                ] },
                { type: 'fields', fields: [
                  { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
                  { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.alignment }
                ] },
                { type: 'fields', fields: [
                  { label: 'Line Height', name: 'line_height', type: 'lookup', options: options.line_heights, defaultValue: config.line_height },
                  { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: options.letter_spacing, defaultValue: config.letter_spacing }
                ] }
              ]
            }, {
              label: 'Card Style',
              fields: [
                { label: 'Background', name: 'card_background_color', type: 'colorfield', defaultValue: config.card_background_color },
                { label: 'Border', type:'fields', fields: [
                  { name: 'card_border_style', type: 'lookup', options: options.border_styles, placeholder: 'Choose a style', defaultValue: config.card_border_style },
                  { name: 'card_border_width', type: 'lookup', options: options.border_widths, placeholder: 'Choose a width', defaultValue: config.card_border_width },
                  { name: 'card_border_color', type: 'colorfield', defaultValue: config.card_border_color }
                ] }
              ]
            }, {
              label: 'Image Style',
              fields: [
                { label: 'Border', type:'fields', fields: [
                  { name: 'image_border_style', type: 'lookup', options: options.border_styles, placeholder: 'Choose a style', defaultValue: config.image_border_style },
                  { name: 'image_border_width', type: 'lookup', options: options.border_widths, placeholder: 'Choose a width', defaultValue: config.image_border_width },
                  { name: 'image_border_color', type: 'colorfield', defaultValue: config.image_border_color }
                ] },
                { label: 'Rounded Corners', name: 'image_border_radius', type: 'range', min: 0, max: 20, defaultValue: config.image_border_radius }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              label: 'Video Settings',
              fields: [
                { label: 'Caption Position', name: 'caption_position', type: 'lookup', options: positions, defaultValue: config.caption_position },
                { label: 'Image Alignment', name: 'image_alignment', type: 'lookup', options: alignments, defaultValue: config.image_alignment },
                { label: 'Caption Width', name: 'caption_width', type: 'lookup', options: widths, defaultValue: config.caption_width }
              ]
            }
          ]
        }
      ]
    }
  }

  _handleChange(data) {
    this.props.onUpdate(data)
  }

  _handleDone() {
    this.props.onDone()
  }


}

export default Video
