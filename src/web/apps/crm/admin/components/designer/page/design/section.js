import { alignments, font_size, letter_spacing, line_heights, fonts } from '../../variables'
import AlignmentField from '../../../alignmentfield'
import FormatField from '../../../formatfield'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Section extends React.Component {

  static propTypes = {
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
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Border Top', name: 'border_top', type: 'textfield', defaultValue: config.border_top },
            { label: 'Border Bottom', name: 'border_bottom', type: 'textfield', defaultValue: config.border_bottom },
            { label: 'Padding Top', name: 'padding_top', type: 'textfield', defaultValue: config.padding_top },
            { label: 'Padding Bottom', name: 'padding_bottom', type: 'textfield', defaultValue: config.padding_bottom }
          ]
        }, {
          label: 'Text',
          fields: [
            { type: 'fields', fields: [
              { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
              { label: 'Font Size', name: 'font_size', type: 'lookup', options: font_size, defaultValue: config.font_size }
            ] },
            { type: 'fields', fields: [
              { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color },
              { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format }
            ] },
            { type: 'fields', fields: [
              { label: 'Line Height', name: 'line_height', type: 'lookup', options: line_heights, defaultValue: config.line_height },
              { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: letter_spacing, defaultValue: config.letter_spacing }
            ] },
            { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.alignment }
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
  config: state.crm.designer.config.sections[props.index]
})

export default connect(mapStateToProps)(Section)
