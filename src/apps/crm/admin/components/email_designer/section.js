import FontFamilyToken from '../../tokens/fontfamily'
import AlignmentField from '../alignmentfield'
import FormatField from '../formatfield'
import * as options from './variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Section extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    label: PropTypes.string,
    index: PropTypes.number,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
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
    const { config } = this.props
    this.setState({ config })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { config } = this.state
    const { index, label } = this.props
    return {
      title: label || `Section ${index + 1}`,
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
            { label: 'Background', name: 'card_background_color', type: 'colorfield', defaultValue: config.card_background },
            this._getBorder('border'),
            { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding }
          ]
        }, {
          label: 'Text',
          fields: [
            { label: 'Font Family', name: 'font_family', type: 'dropdown', options: options.font_families, defaultValue: config.font_family, format: FontFamilyToken },
            { type: 'fields', fields: [
              { label: 'Font Size', name: 'font_size', type: 'dropdown', options: options.font_sizes, defaultValue: config.font_size },
              { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color }
            ] },
            { type: 'fields', fields: [
              { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
              { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.text_align }
            ] },
            { type: 'fields', fields: [
              { label: 'Line Height', name: 'line_height', type: 'dropdown', options: options.line_heights, defaultValue: config.line_height },
              { label: 'Letter Spacing', name: 'letter_spacing', type: 'dropdown', options: options.letter_spacing, defaultValue: config.letter_spacing }
            ] }
          ]
        }
      ]
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
    this.props.onPop()
  }

}

export default Section
