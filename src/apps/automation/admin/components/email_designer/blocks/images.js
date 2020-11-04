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
      this._handleChangeField('layout', this._getLayouts()[0].value)
    } else if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Images Group',
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
                { label: 'Background', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
                this._getBorder('border', 'Border'),
                { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding }
              ]
            }, {
              label: 'Image Style',
              fields: [
                this._getBorder('image_border', 'Border'),
                { label: 'Padding', name: 'image_padding', type: 'dropdown', options: options.paddings, defaultValue: config.image_padding },
                { label: 'Rounded Corners', name: 'image_border_radius', type: 'range', min: 0, max: 20, defaultValue: config.image_border_radius }
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
      background_color: null,
      border: null,
      padding: 0,
      image_border: null,
      image_padding: 0,
      image_border_radius: null,
      layout: [[1]]
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

  _getLayouts() {
    const { config } = this.state
    if(config.images.length <= 1) {
      return [
        { value: [[1]], text: 'Full' }
      ]
    } else if(config.images.length === 2) {
      return [
        { value: [[1,1]], text: 'Side By Side' },
        { value: [[1],[1]], text: 'Above, Below' }
      ]
    } else if(config.images.length === 3) {
      return [
        { value: [[1],[1,1]], text: 'Two Below' },
        { value: [[1,1],[1]], text: 'Two Above' },
        { value: [[1],[1],[1]], text: 'List' }
      ]
    } else if(config.images.length === 4) {
      return [
        { value: [[1,1],[1,1]], text: 'Two Below' },
        { value: [[1],[1,1],[1]], text: 'Two In Middle' },
        { value: [[1],[1],[1],[1]], text: 'List' }
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
