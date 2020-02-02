import FontFamilyToken from '../../../tokens/fontfamily'
import AlignmentField from '../../alignmentfield'
import FormatField from '../../formatfield'
import VideoField from '../../videofield'
import * as options from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Video extends React.Component {

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
                { label: 'Video', name: 'video', type: VideoField, prompt: 'Choose Video', defaultValue: config.video },
                { label: 'Caption', name: 'caption', type: 'htmlfield', defaultValue: config.caption },
                { prompt: 'Show Caption', name: 'show_caption', type: 'checkbox', defaultValue: config.show_caption }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              fields: [
                { label: 'Background', name: 'card_background_color', type: 'colorfield', defaultValue: config.card_background_color },
                this._getBorder('card_border', 'Border'),
                { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding }
              ]
            }, {
              label: 'Image Style',
              fields: [
                this._getBorder('image_border', 'Border'),
                { label: 'Rounded Corners', name: 'image_border_radius', type: 'range', min: 0, max: 20, defaultValue: config.image_border_radius }
              ]
            }, {
              label: 'Caption Style',
              fields: [
                { label: 'Background', name: 'caption_background_color', type: 'colorfield', defaultValue: config.caption_background_color },
                { label: 'Caption Padding', name: 'caption_padding', type: 'dropdown', options: options.paddings, defaultValue: config.caption_padding }
              ]
            }, {
              label: 'Text Style',
              fields: [
                { label: 'Font Family', name: 'font_family', type: 'dropdown', options: options.font_families, defaultValue: config.font_family, format: FontFamilyToken },
                { type: 'fields', fields: [
                  { label: 'Font Size', name: 'font_size', type: 'dropdown', options: options.font_sizes, defaultValue: config.font_size },
                  { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color }
                ] },
                { type: 'fields', fields: [
                  { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
                  { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.text_align }
                ] },
                { type: 'fields', fields: [
                  { label: 'Line Height', name: 'line_height', type: 'dropdown', options: options.line_heights, defaultValue: config.line_height },
                  { label: 'Letter Spacing', name: 'letter_spacing', type: 'dropdown', options: options.letter_spacing, defaultValue: config.letter_spacing }
                ] }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { label: 'Video Position', name: 'video_position', type: 'dropdown', options: options.image_positions, defaultValue: config.video_position },
                ...this._getWidth()
              ]
            }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      video: null,
      caption: '<p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
      show_caption: true,
      caption_background_color: null,
      caption_padding: 0,
      card_background_color: null,
      card_border_width: null,
      card_border_style: null,
      card_border_color: null,
      padding: 16,
      image_border_width: null,
      image_border_style: null,
      image_border_color: null,
      image_border_radius: null,
      font_family: null,
      font_size: null,
      color: null,
      format: null,
      text_align: 'left',
      line_height: null,
      letter_spacing: null,
      video_position: 'top',
      video_width: 6
    }
  }

  _getBorder(type, label) {
    const { config } = this.state
    if(!config[`${type}_style`]) {
      return { label, name: `${type}_style`, type: 'dropdown', options: options.border_styles, placeholder: 'Style', defaultValue: config[`${type}_style`] }
    }
    return { label, type:'fields', fields: [
      { name: `${type}_style`, type: 'dropdown', options: options.border_styles, placeholder: 'Style', defaultValue: config[`${type}_style`] },
      { name: `${type}_width`, type: 'dropdown', options: options.border_widths, placeholder: 'Width', defaultValue: config[`${type}_width`] },
      { name: `${type}_color`, type: 'colorfield', defaultValue: config[`${type}_color`] }
    ] }
  }

  _getWidth() {
    const { config } = this.state
    if(_.includes(['top','bottom'], config.image_position)) return []
    return [
      { label: 'Video Width', name: 'video_width', type: 'dropdown', options: options.image_widths, defaultValue: config.video_width }
    ]
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

export default Video
