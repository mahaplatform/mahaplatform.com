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
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

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

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.state
    const { label } = this.props
    return {
      title: label,
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
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color }
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

  _getDefault() {
    return {
      background_color: null,
      h1_font_family: null,
      h1_font_size: null,
      h1_color: null,
      h1_format: [],
      h1_text_align: 'left',
      h1_line_height: null,
      h1_letter_spacing: null,
      h2_font_family: null,
      h2_font_size: null,
      h2_color: null,
      h2_format: [],
      h2_text_align: 'left',
      h2_line_height: null,
      h2_letter_spacing: null,
      p_font_family: null,
      p_font_size: null,
      p_color: null,
      p_format: [],
      p_text_align: 'left',
      p_line_height: null,
      p_letter_spacing: null,
      a_format: [],
      a_color: null
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

export default Section
