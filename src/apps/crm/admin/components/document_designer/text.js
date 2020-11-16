import * as options from './variables'
import AlignmentField from '../alignmentfield'
import FormatField from '../formatfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Text extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  state = {
    columns: 1
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
      title: 'Text Block',
      onChangeField: this._handleChangeField,
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
                ...new Array(this.state.columns).fill(0).map((i, index) => {
                  return { name: `content_${index}`, type: 'htmlfield', defaultValue: config[`content_${index}`] }
                })
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
                { label: 'Number of Columns', name: 'columns', type: 'lookup', options: options.columns, defaultValue: config.columns },
                { label: 'Column Split', name: 'split', type: 'lookup', options: options.splits, defaultValue: config.split }
              ]
            }
          ]
        }
      ]
    }
  }

  _handleChangeField(name, value) {
    if(name === 'columns') {
      this.setState({
        columns: value
      })
    }
  }

  _handleChange(data) {
    this.props.onUpdate(data)
  }

  _handleDone() {
    this.props.onDone()
  }


}

export default Text