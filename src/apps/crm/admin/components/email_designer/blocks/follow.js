import * as options from '../variables'
import AlignmentField from '../../alignmentfield'
import FormatField from '../../formatfield'
import FollowsField from '../../followsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Follow extends React.Component {

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
      title: 'Social Share Block',
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
                { name: 'networks', type: FollowsField, defaultValue: config.networks }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              label: 'Container Style',
              fields: [
                { label: 'Background', name: 'background_color', type: 'colorfield', defaultValue: config.background_color }
              ]
            }, {
              label: 'Button Style',
              fields: [
                { label: 'Background', name: 'button_background_color', type: 'colorfield', defaultValue: config.button_background_color },
                { label: 'Rounded Corners', name: 'button_border_radius', type: 'range', min: 0, max: 20, defaultValue: config.button_border_radius }
              ]
            }, {
              label: 'Text Style',
              fields: [
                { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
                { label: 'Font Size', name: 'font_size', type: 'lookup', options: options.font_size, defaultValue: config.font_size },
                { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color },
                { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
                { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.alignment },
                { label: 'Line Height', name: 'line_height', type: 'lookup', options: options.line_heights, defaultValue: config.line_height },
                { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: options.letter_spacing, defaultValue: config.letter_spacing }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { label: 'Align', name: 'align', type: 'lookup', options: ['left','center','right'], defaultValue: config.align },
                { label: 'Icon Style', name: 'icon_style', type: 'lookup', options: ['solid','outline'], defaultValue: config.icon_style },
                { label: 'Icon Color', name: 'icon_color', type: 'lookup', options: ['color','dark','gray','light'], defaultValue: config.icon_color }
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

export default Follow
