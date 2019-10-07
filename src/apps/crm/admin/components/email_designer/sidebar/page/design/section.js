import * as options from '../../../variables'
import AlignmentField from '../../../../alignmentfield'
import FormatField from '../../../../formatfield'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

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

  _handleDone = this._handleDone.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    if(!this.props.config) return null
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, index, label } = this.props
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
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Border Top', type:'fields', fields: [
              { name: 'border_top_style', type: 'lookup', options: options.border_styles, placeholder: 'Choose a style', defaultValue: config.border_top_style },
              { name: 'border_top_width', type: 'lookup', options: options.border_widths, placeholder: 'Choose a width', defaultValue: config.border_top_width },
              { name: 'border_top_color', type: 'colorfield', defaultValue: config.border_top_color }
            ] },
            { label: 'Border Bottom', type:'fields', fields: [
              { name: 'border_bottom_style', type: 'lookup', options: options.border_styles, placeholder: 'Choose a style', defaultValue: config.border_bottom_style },
              { name: 'border_bottom_width', type: 'lookup', options: options.border_widths, placeholder: 'Choose a width', defaultValue: config.border_bottom_width },
              { name: 'border_bottom_color', type: 'colorfield', defaultValue: config.border_bottom_color }
            ] },
            { label: 'Padding Top', name: 'padding_top', type: 'lookup', options: options.paddings, defaultValue: config.padding_top },
            { label: 'Padding Bottom', name: 'padding_bottom', type: 'lookup', options: options.paddings, defaultValue: config.padding_bottom }
          ]
        }, {
          label: 'Text',
          fields: [
            { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
            { type: 'fields', fields: [
              { label: 'Font Size', name: 'font_size', type: 'lookup', options: options.font_size, defaultValue: config.font_size },
              { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color }
            ] },
            { type: 'fields', fields: [
              { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
              { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.alignment }
            ] },
            { type: 'fields', fields: [
              { label: 'Line Height', name: 'line_height', type: 'lookup', options: options.line_heights, defaultValue: config.line_height },
              { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: options.letter_spacing, defaultValue: config.letter_spacing }
            ] }
          ]
        }
      ]
    }
  }

  _handleChange(data) {
    const { index } = this.props
    this.props.onUpdate(`sections[${index}]`, data)
  }

  _handleDone() {
    this.props.onPop()
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.email_designer[props.cid].config.sections[props.index]
})

export default connect(mapStateToProps)(Section)
