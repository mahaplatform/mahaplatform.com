import AlignmentField from '../../alignmentfield'
import FormatField from '../../formatfield'
import ImageField from '../../imagefield'
import * as options from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

const caption_positions = [
  { value: 'bottom', text: 'Bottom' },
  { value: 'top', text: 'Top' },
  { value: 'left', text: 'Left' },
  { value: 'right', text: 'Right' }
]

const caption_widths = [
  { value: 4, text: 'One-Third' },
  { value: 6, text: 'Half' },
  { value: 8, text: 'Two-Thirds' },
  { value: 9, text: 'Three-quarters' }
]

class Image extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Image Card Block',
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
                { label: 'Image', name: 'image', type: ImageField, defaultValue: config.image },
                { label: 'Caption', name: 'caption', type: 'htmlfield', defaultValue: config.caption }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              fields: [
                { label: 'Background', name: 'card_background_color', type: 'colorfield', defaultValue: config.card_background },
                this._getBorder('card'),
                { type: 'fields', fields: [
                  { label: 'Padding Top', name: 'padding_top', type: 'lookup', options: options.paddings, defaultValue: config.padding_top },
                  { label: 'Padding Bottom', name: 'padding_bottom', type: 'lookup', options: options.paddings, defaultValue: config.padding_bottom }
                ] }
              ]
            }, {
              label: 'Image Style',
              fields: [
                this._getBorder('image'),
                { label: 'Rounded Corners', name: 'border_radius', type: 'range', min: 0, max: 20, defaultValue: config.border_radius }
              ]
            }, {
              label: 'Text Style',
              fields: [
                { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
                { type: 'fields', fields: [
                  { label: 'Font Size', name: 'font_size', type: 'lookup', options: options.font_size, defaultValue: config.font_size },
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
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { label: 'Caption Position', name: 'caption_position', type: 'lookup', options: caption_positions, defaultValue: config.caption_position },
                ...this._getWidth()
              ]
            }
          ]
        }
      ]
    }
  }

  _getBorder(type) {
    const { config } = this.state
    if(!config[`${type}_border_style`]) {
      return { label: 'Border', name: `${type}_border_style`, type: 'lookup', options: options.border_styles, placeholder: 'Style', defaultValue: config[`${type}_border_style`] }
    }
    return { label: 'Border', type:'fields', fields: [
      { name: `${type}_border_style`, type: 'lookup', options: options.border_styles, placeholder: 'Style', defaultValue: config[`${type}_border_style`] },
      { name: `${type}_border_width`, type: 'lookup', options: options.border_widths, placeholder: 'Width', defaultValue: config[`${type}_border_width`] },
      { name: `${type}_border_color`, type: 'colorfield', defaultValue: config[`${type}_border_color`] }
    ] }
  }

  _getWidth() {
    const { config } = this.state
    if(_.includes(['top','bottom'], config.caption_position)) return []
    return [
      { label: 'Caption Width', name: 'caption_width', type: 'lookup', options: caption_widths, defaultValue: config.caption_width }
    ]
  }

  _getDefault() {
    return {
      images: null,
      caption: '<p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
      card_background_color: null,
      card_border_width: null,
      card_border_style: null,
      card_border_color: null,
      padding_top: 16,
      padding_bottom: 16,
      image_border_width: null,
      image_border_style: null,
      image_border_color: null,
      border_radius: null,
      font_family: null,
      font_size: null,
      color: null,
      format: null,
      alignment: null,
      line_height: null,
      letter_spacing: null,
      caption_position: 'bottom',
      caption_width: 6
    }
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Image
