import FontFamilyToken from '../../../tokens/fontfamily'
import AlignmentField from '../../alignmentfield'
import FormatField from '../../formatfield'
import * as options from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Button extends React.Component {

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
      title: 'Button Block',
      onChange: this._handleChange,
      onCancel: this._handleDone,
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
                { label: 'Button Text', name: 'content', type: 'textfield', defaultValue: config.content },
                { label: 'Link To', name: 'link_strategy', type: 'dropdown', options: options.link_strategies, defaultValue: config.link_strategy },
                ...this._getLinkStrategy()
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              fields: [
                { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding }
              ]
            },
            {
              label: 'Button Style',
              fields: [
                { type: 'fields', fields: [
                  { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
                  { label: 'Padding', name: 'button_padding', type: 'dropdown', options: options.paddings, defaultValue: config.button_padding }
                ] },
                { label: 'Rounded Corners', name: 'border_radius', type: 'range', min: 0, max: 20, defaultValue: config.border_radius }
              ]
            },
            {
              label: 'Button Text Style',
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
                { label: 'Width', name: 'display', type: 'dropdown', options: options.displays, defaultValue: config.display },
                ...this._getAlignment()
              ]
            }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      content: 'Click Me',
      link_strategy: 'web',
      url: null,
      email_address: null,
      email_subject: null,
      email_body: null,
      anchor: null,
      asset_id: null,
      border_radius: null,
      background_color: '#2185D0',
      color: '#FFFFFF',
      letter_spacing: 0,
      font_family: null,
      font_size: null,
      padding: 16,
      button_padding: 10,
      align: 'center',
      display: 'block'
    }
  }

  _getAlignment() {
    const { config } = this.state
    if(config.display === 'block') return []
    return [
      { label: 'Align', name: 'align', type: 'dropdown', options: options.alignments, defaultValue: config.align }
    ]
  }

  _getLinkStrategy() {
    const { config } = this.state
    if(config.link_strategy === 'web') {
      return [
        { label: 'Web Address', name: 'url', type: 'textfield' }
      ]
    } else if(config.link_strategy === 'email') {
      return [
        { label: 'Email Address', name: 'email_address', type: 'textfield' },
        { label: 'Message Subject', name: 'email_subject', type: 'textfield' },
        { label: 'Message Body', name: 'email_body', type: 'textfield' }
      ]
    } else if(config.link_strategy === 'asset') {
      return [
        { label: 'File', name: 'asset_id', type: 'attachmentfield', prompt: 'Choose File' }
      ]
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

export default Button
