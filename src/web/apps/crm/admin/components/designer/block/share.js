import { columns, font_size, letter_spacing, line_heights, fonts } from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Share extends React.Component {

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
              fields: []
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              label: 'Container Style',
              fields: []
            }, {
              label: 'Button Style',
              fields: []
            }, {
              label: 'Text Style',
              fields: [
                { label: 'Font Family', name: 'font_family', type: 'lookup', options: fonts, defaultValue: config.font_family },
                { label: 'Font Size', name: 'font_size', type: 'lookup', options: font_size, defaultValue: config.font_size },
                { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color },
                { label: 'Line Height', name: 'line_height', type: 'lookup', options: line_heights, defaultValue: config.line_height },
                { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: letter_spacing, defaultValue: config.letter_spacing }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: []
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

export default Share
