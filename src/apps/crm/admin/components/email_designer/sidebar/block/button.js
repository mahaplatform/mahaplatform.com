import { alignments, displays, font_size, letter_spacing, link_strategies, line_heights } from '../../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Button extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  state = {
    link_strategy: 'web'
  }

  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Button Block',
      onChangeField: this._handleChangeField,
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelText: <i className="fa fa-chevron-left" />,
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
                { label: 'Link To', name: 'link_strategy', type: 'lookup', options: link_strategies, defaultValue: config.link_strategy },
                ...this._getLinkStrategy()
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              fields: [
                { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
                { label: 'Padding', name: 'padding', type: 'textfield', defaultValue: config.padding },
                { label: 'Border', name: 'border', type: 'textfield', defaultValue: config.border },
                { label: 'Rounded Corners', name: 'border_radius', type: 'range', min: 0, max: 20, defaultValue: config.border_radius }
              ]
            },
            {
              label: 'Button Text Style',
              fields: [
                { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
                { type: 'fields', fields: [
                  { label: 'Font Size', name: 'font_size', type: 'lookup', options: font_size, defaultValue: config.font_size },
                  { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color }
                ] },
                { type: 'fields', fields: [
                  { label: 'Line Height', name: 'line_height', type: 'lookup', options: line_heights, defaultValue: config.line_height },
                  { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: letter_spacing, defaultValue: config.letter_spacing }
                ] }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { label: 'Align', name: 'align', type: 'lookup', options: alignments, defaultValue: config.align },
                { label: 'Width', name: 'display', type: 'lookup', options: displays, defaultValue: config.display }
              ]
            }
          ]
        }
      ]
    }
  }

  _getLinkStrategy() {
    const { link_strategy } = this.state
    if(link_strategy === 'web') {
      return [
        { label: 'Web Address', name: 'url', type: 'textfield' },
        { label: 'Open in New Winodw', name: 'open_in_new_window', type: 'checkbox' },
        { label: 'Title Attribute', name: 'title', type: 'textfield' },
        { label: 'CSS Class', name: 'class', type: 'textfield' }
      ]
    } else if(link_strategy === 'email') {
      return [
        { label: 'Email Address', name: 'email_address', type: 'textfield' },
        { label: 'Message Subject', name: 'email_subject', type: 'textfield' },
        { label: 'Message Body', name: 'email_body', type: 'textfield' }
      ]
    } else if(link_strategy === 'anchor') {
      return []
    } else if(link_strategy === 'asset') {
      return []
    }
  }

  _handleChange(data) {
    this.props.onUpdate(data)
  }

  _handleChangeField(name, value) {
    if(name === 'link_strategy') {
      this.setState({
        link_strategy: value
      })
    }
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Button
