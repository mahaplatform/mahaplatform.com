import * as options from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Divider extends React.Component {

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
            { label: 'Padding Top', name: 'padding_top', type: 'lookup', options: options.paddings, defaultValue: config.padding_top },
            { label: 'Padding Bottom', name: 'padding_bottom', type: 'lookup', options: options.paddings, defaultValue: config.padding_bottom },
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

  _getDefault() {
    return {
      padding_top: 18,
      padding_bottom: 18,
      border_width: 2,
      border_style: 'solid',
      border_color: '#000000',
      background_color: null
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

export default Divider
