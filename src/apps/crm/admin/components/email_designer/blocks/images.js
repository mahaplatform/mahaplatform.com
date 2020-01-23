import ImagesField from '../../imagesfield'
import * as options from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Images extends React.Component {

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
    if(!_.isEqual(_.get(config, 'images'), _.get(prevState.config, 'images'))) {
      this._handleChangeField('layout', this._getLayouts()[0])
    } else if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Images Block',
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
                { name: 'images', type: ImagesField, defaultValue: config.images }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              fields: [
                this._getBorder(),
                { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding },
                { label: 'Rounded Corners', name: 'border_radius', type: 'range', min: 0, max: 20, defaultValue: config.border_radius }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { label: 'Layout', name: 'layout', type: 'dropdown', options: this._getLayouts(), defaultValue: config.layout }
              ]
            }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      images: [],
      border: null,
      border_radius: null,
      layout: [1],
      padding: 0
    }
  }

  _getBorder(type) {
    const { config } = this.state
    if(!config.border_style) {
      return { label: 'Border', name: 'border_style', type: 'dropdown', options: options.border_styles, placeholder: 'Style', defaultValue: config.border_style }
    }
    return { label: 'Border', type:'fields', fields: [
      { name: 'border_style', type: 'dropdown', options: options.border_styles, placeholder: 'Style', defaultValue: config.border_style },
      { name: 'border_width', type: 'dropdown', options: options.border_widths, placeholder: 'Width', defaultValue: config.border_width },
      { name: 'border_color', type: 'colorfield', defaultValue: config.border_color }
    ] }
  }

  _getLayouts() {
    const { config } = this.state
    if(config.images.length === 1) {
      return [
        { value: [1], text: 'Full' }
      ]
    } else if(config.images.length === 2) {
      return [
        { value: [2], text: 'Side By Side' },
        { value: [1,1], text: 'Above, Below' }
      ]
    } else if(config.images.length === 3) {
      return [
        { value: [1,2], text: 'Two Below' },
        { value: [2,1], text: 'Two Above' },
        { value: [1,1,1], text: 'List' }
      ]
    } else if(config.images.length === 4) {
      return [
        { value: [2,2], text: 'Two Below' },
        { value: [1,2,1], text: 'Two In Middle' },
        { value: [1,1,1,1], text: 'List' }
      ]
    }
    return []
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleChangeField(name, value) {
    this.setState({
      config: {
        ...this.state.config,
        [name]: value
      }
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Images
