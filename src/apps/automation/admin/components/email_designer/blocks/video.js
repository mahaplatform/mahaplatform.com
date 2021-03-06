import FontFamilyToken from '../../../tokens/fontfamily'
import { Button, Form } from '@admin'
import * as options from '../variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Video extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onTokens: PropTypes.func,
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
                { label: 'Video', name: 'video', type: 'videofield', prompt: 'Choose Video', defaultValue: config.video },
                { prompt: 'Show Caption', name: 'show_caption', type: 'checkbox', defaultValue: config.show_caption },
                { label: 'Caption', include: config.show_caption === true, name: 'caption', type: 'htmlfield', after: <Button { ...this._getTokens() } />, defaultValue: config.caption }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              fields: [
                { label: 'Background', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
                this._getBorder('border', 'Border'),
                { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding }
              ]
            }, {
              label: 'Image Style',
              fields: [
                this._getBorder('image_border', 'Border'),
                { label: 'Rounded Corners', name: 'image_border_radius', type: 'range', min: 0, max: 20, defaultValue: config.image_border_radius },
                { label: 'Padding', name: 'image_padding', type: 'dropdown', options: options.paddings, defaultValue: config.image_padding }
              ]
            }, {
              label: 'Caption Style',
              fields: [
                { label: 'Background', name: 'caption_background_color', type: 'colorfield', defaultValue: config.caption_background_color },
                { label: 'Padding', name: 'caption_padding', type: 'dropdown', options: options.paddings, defaultValue: config.caption_padding }
              ]
            },
            ...options.block_types.map(({ value, text }) => ({
              label: `${text} Style`,
              fields: [
                { label: 'Font Family', name: `${value}_font_family`, type: 'dropdown', options: options.font_families, defaultValue: config[`${value}_font_family`], format: FontFamilyToken },
                { type: 'fields', fields: [
                  { label: 'Font Size', name: `${value}_font_size`, type: 'dropdown', options: options.font_sizes, defaultValue: config[`${value}_font_size`] },
                  { label: 'Color', name: `${value}_color`, type: 'colorfield', defaultValue: config[`${value}_color`] }
                ] },
                { type: 'fields', fields: [
                  { label: 'Format', name: `${value}_format`, type: 'formatfield', defaultValue: config[`${value}_format`] },
                  { label: 'Alignment', name: `${value}_text_align`, type: 'alignmentfield', defaultValue: config[`${value}_text_align`] }
                ] },
                { type: 'fields', fields: [
                  { label: 'Line Height', name: `${value}_line_height`, type: 'dropdown', options: options.line_heights, defaultValue: config[`${value}_line_height`] },
                  { label: 'Letter Spacing', name: `${value}_letter_spacing`, type: 'dropdown', options: options.letter_spacing, defaultValue: config[`${value}_letter_spacing`] }
                ] }
              ]
            })),
            {
              label: 'Link Style',
              fields: [
                { type: 'fields', fields: [
                  { label: 'Color', name: 'a_color', type: 'colorfield', defaultValue: config.a_color },
                  { label: 'Format', name: 'a_format', type: 'formatfield', defaultValue: config.a_format }
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
      background_color: null,
      border_width: null,
      border_style: null,
      border_color: null,
      padding: 0,
      caption_background_color: null,
      caption_padding: 16,
      image_border_width: null,
      image_border_style: null,
      image_border_color: null,
      image_border_radius: null,
      image_padding: 0,
      video_position: 'top',
      video_width: 6,
      h1_font_family: null,
      h1_font_size: null,
      h1_color: null,
      h1_format: [],
      h1_text_align: 'left',
      h1_line_height: null,
      h1_letter_spacing: null,
      h2_font_family: null,
      h2_font_size: null,
      h2_color: null,
      h2_format: [],
      h2_text_align: 'left',
      h2_line_height: null,
      h2_letter_spacing: null,
      p_font_family: null,
      p_font_size: null,
      p_color: null,
      p_format: null,
      p_text_align: 'left',
      p_line_height: null,
      p_letter_spacing: null,
      a_format: [],
      a_color: null
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

  _getTokens() {
    const { onTokens } = this.props
    return {
      label: 'You can use the these tokens',
      className: 'link',
      handler: onTokens
    }
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
