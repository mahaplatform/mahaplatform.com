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
                { label: 'Background', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
                this._getBorder('border', 'Border'),
                { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding }
              ]
            },
            {
              label: 'Button Style',
              fields: [
                { label: 'Background', name: 'button_background_color', type: 'colorfield', defaultValue: config.button_background_color },
                { label: 'Padding', name: 'button_padding', type: 'dropdown', options: options.paddings, defaultValue: config.button_padding },
                { label: 'Rounded Corners', name: 'button_border_radius', type: 'range', min: 0, max: 20, defaultValue: config.button_border_radius }
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
      asset_id: null,
      background_color: null,
      padding: 16,
      border: null,
      button_background_color: '#2185D0',
      button_padding: 8,
      button_border_radius: null,
      font_family: null,
      font_size: null,
      color: '#FFFFFF',
      format: ['bold'],
      text_align: 'center',
      line_height: null,
      letter_spacing: null,
      display: 'block',
      align: 'center'
    }
  }

  _getAlignment() {
    const { config } = this.state
    if(config.display === 'block') return []
    return [
      { label: 'Align', name: 'align', type: 'dropdown', options: options.alignments, defaultValue: config.align }
    ]
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

  _getLinkStrategy() {
    const { config } = this.state
    if(config.link_strategy === 'web') {
      return [
        { label: 'Web Address', name: 'url', type: 'textfield' }
      ]
    } else if(config.link_strategy === 'email') {
      return [
        { label: 'Email Address', name: 'email_address', type: 'textfield', defaultValue: config.email_address },
        { label: 'Message Subject', name: 'email_subject', type: 'textfield', defaultValue: config.email_subject },
        { label: 'Message Body', name: 'email_body', type: 'textfield', defaultValue: config.email_body }
      ]
    } else if(config.link_strategy === 'form') {
      return [
        { label: 'Form', name: 'form_id', type: 'lookup', endpoint: '/api/admin/crm/forms', value: 'id', text: 'title', defaultValue: config.form_id }
      ]
    } else if(config.link_strategy === 'event') {
      return [
        { label: 'Event', name: 'event_id', type: 'lookup', endpoint: '/api/admin/events/events', value: 'id', text: 'title', defaultValue: config.event_id }
      ]
    } else if(config.link_strategy === 'asset') {
      return [
        { label: 'File', name: 'asset_id', type: 'attachmentfield', prompt: 'Choose File', defaultValue: config.asset_id}
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
