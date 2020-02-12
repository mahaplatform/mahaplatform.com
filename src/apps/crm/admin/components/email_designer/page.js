import FontFamilyToken from '../../tokens/fontfamily'
import AlignmentField from '../alignmentfield'
import FormatField from '../formatfield'
import * as options from './variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Page extends React.Component {

  static propTypes = {
    config: PropTypes.object,
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
      onChange: this._handleChange,
      showHeader: false,
      sections: [
        {
          fields: [
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Padding', name: 'padding', type: 'dropdown', options: options.paddings, defaultValue: config.padding }
          ]
        },
        {
          label: 'Email Style',
          fields: [
            { label: 'Background Color', name: 'email_background_color', type: 'colorfield', defaultValue: config.email_background_color },
            this._getBorder('email_border', 'Email Border')
          ]
        },
        ...options.block_types.map(({ value, text }) => ({
          label: `${text} Style`,
          fields: [
            { label: 'Font Family', name: `${value}_font_family`, type: 'dropdown', options: options.font_families, defaultValue: config[`${value}_font_family`], format: FontFamilyToken },
            { type: 'fields', fields: [
              { label: 'Font Size', name: `${value}_font_size`, type: 'dropdown', options: options.font_sizes, defaultValue: config[`${value}_font_size`] },
              { label: 'Color', name: `${value}_color`, type: 'colorfield', defaultValue: config[`${value}_color`] }
            ] },
            { type: 'fields', fields: [
              { label: 'Format', name: `${value}_format`, type: FormatField, defaultValue: config[`${value}_format`] },
              { label: 'Alignment', name: `${value}_text_align`, type: AlignmentField, defaultValue: config[`${value}_text_align`] }
            ] },
            { type: 'fields', fields: [
              { label: 'Line Height', name: `${value}_line_height`, type: 'dropdown', options: options.line_heights, defaultValue: config[`${value}_line_height`] },
              { label: 'Letter Spacing', name: `${value}_letter_spacing`, type: 'dropdown', options: options.letter_spacing, defaultValue: config[`${value}_letter_spacing`] }
            ] }
          ]
        })),
        {
          label: 'Link Style',
          fields: [
            { type: 'fields', fields: [
              { label: 'Color', name: 'a_color', type: 'colorfield', defaultValue: config.a_color },
              { label: 'Format', name: 'a_format', type: FormatField, defaultValue: config.a_format }
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

  _getDefault() {
    return {
      background_color: '#DFDFDF',
      border_top_width: null,
      border_top_style: null,
      border_top_color: null,
      padding: 10,
      email_background_color: null,
      email_border_width: null,
      email_border_style: null,
      email_border_color: null,
      h1_font_family: 'Arial, Helvetica, sans-serif',
      h1_font_size: 24,
      h1_color: '#202020',
      h1_format: ['bold'],
      h1_text_align: 'left',
      h1_line_height: 1,
      h1_letter_spacing: 0,
      h2_font_family: 'Arial, Helvetica, sans-serif',
      h2_font_size: 18,
      h2_color: '#202020',
      h2_format: ['bold'],
      h2_text_align: 'left',
      h2_line_height: 1,
      h2_letter_spacing: 0,
      p_font_family: 'Arial, Helvetica, sans-serif',
      p_font_size: 14,
      p_color: '#202020',
      p_format: [],
      p_text_align: 'left',
      p_line_height: 1.5,
      p_letter_spacing: 0,
      a_format: ['underline'],
      a_color: '#2185D0'
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
    this.props.onPop()
  }

}

export default Page
