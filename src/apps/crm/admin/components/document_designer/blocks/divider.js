import * as options from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Divider extends React.Component {

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
      title: 'Divider Block',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Padding Top', name: 'padding', type: 'lookup', options: options.paddings, defaultValue: config.padding_top },
            { label: 'Padding Bottom', name: 'padding', type: 'lookup', options: options.paddings, defaultValue: config.padding_bottom },
            { label: 'Border', type:'fields', fields: [
              { name: 'border_width', type: 'lookup', options: options.border_widths, placeholder: 'Width', defaultValue: config.border_width },
              { name: 'border_style', type: 'lookup', options: options.border_styles, placeholder: 'Style', defaultValue: config.border_style },
              { name: 'border_color', type: 'colorfield', defaultValue: config.border_color }
            ] },
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color }
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

export default Divider
