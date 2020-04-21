import FontFamilyToken from '../../../tokens/fontfamily'
import AlignmentField from '../../alignmentfield'
import FormatField from '../../formatfield'
import { Button, Form } from 'maha-admin'
import * as options from '../variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Preferences extends React.Component {

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
      title: 'Text Block',
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
                { label: 'Text', name: 'text', type: 'htmlfield', after: <Button { ...this._getTokens() } />, defaultValue: config.text }
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
              label: 'Text Style',
              fields: [
                { label: 'Font Family', name: 'p_font_family', type: 'dropdown', options: options.font_families, defaultValue: config.p_font_family, format: FontFamilyToken },
                { type: 'fields', fields: [
                  { label: 'Font Size', name: 'p_font_size', type: 'dropdown', options: options.font_sizes, defaultValue: config.p_font_size },
                  { label: 'Color', name: 'p_color', type: 'colorfield', defaultValue: config.p_color }
                ] },
                { type: 'fields', fields: [
                  { label: 'Format', name: 'p_format', type: FormatField, defaultValue: config.p_format },
                  { label: 'Alignment', name: 'p_text_align', type: AlignmentField, defaultValue: config.p_text_align }
                ] },
                { type: 'fields', fields: [
                  { label: 'Line Height', name: 'p_line_height', type: 'dropdown', options: options.line_heights, defaultValue: config.p_line_height },
                  { label: 'Letter Spacing', name: 'vletter_spacing', type: 'dropdown', options: options.letter_spacing, defaultValue: config.p_letter_spacing }
                ] }
              ]
            },
            {
              label: 'Link Style',
              fields: [
                { type: 'fields', fields: [
                  { label: 'Color', name: 'a_color', type: 'colorfield', defaultValue: config.a_color },
                  { label: 'Format', name: 'a_format', type: FormatField, defaultValue: config.a_format }
                ] }
              ]
            }
          ]
        }
      ]
    }
  }

  _getTokens() {
    const { onTokens } = this.props
    return {
      label: 'You can use the these tokens',
      className: 'link',
      handler: onTokens
    }
  }

  _getDefault() {
    return {
      text: '<p>This email was sent to <strong><%- contact.email %></strong>. If you would like to control how much email you receive from us, you can <a href="<%- email.preferences_link %>">adjust your preferences</a></p>',
      background_color: null,
      border_style: null,
      border_width: null,
      border_color: null,
      padding: 8,
      p_font_family: null,
      p_font_size: 12,
      p_color: null,
      p_format: [],
      p_text_align: 'center',
      p_line_height: null,
      p_letter_spacing: null,
      a_color: null,
      a_format: []
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

export default Preferences
