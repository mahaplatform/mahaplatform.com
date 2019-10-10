import * as options from '../variables'
import AlignmentField from '../../alignmentfield'
import FormatField from '../../formatfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Footer extends React.Component {

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
      title: 'Footer Block',
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
                { name: 'content', type: 'htmlfield', defaultValue: config.content_0 }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              label: 'Text Style',
              fields: [
                { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
                { label: 'Font Size', name: 'font_size', type: 'lookup', options: options.font_size, defaultValue: config.font_size },
                { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color },
                { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
                { label: 'Line Height', name: 'line_height', type: 'lookup', options: options.line_heights, defaultValue: config.line_height },
                { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: options.letter_spacing, defaultValue: config.letter_spacing },
                { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.alignment }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { label: 'Number of Columns', name: 'columns', type: 'lookup', options: options.columns, defaultValue: config.columns }
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

export default Footer
