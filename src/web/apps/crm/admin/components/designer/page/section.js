import { alignments, font_size, letter_spacing, line_heights, fonts } from '../variables'
import FontToken from '../../../tokens/font'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import { unflatten } from 'flat'
import React from 'react'

class Preheader extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.string,
    label: PropTypes.string,
    section: PropTypes.string,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _getForm() {
    const { config, label } = this.props
    return {
      title: label,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      sections: [
        {
          fields: [
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Padding Top', name: 'padding_top', type: 'textfield', defaultValue: config.padding_top },
            { label: 'Padding Bottom', name: 'padding_bottom', type: 'textfield', defaultValue: config.padding_bottom }
          ]
        },{
          label: 'Text',
          fields: [
            { label: 'Font Family', name: 'font_family', type: 'lookup', options: fonts, defaultValue: config.font_family, format: FontToken },
            { label: 'Font Size', name: 'font_size', type: 'lookup', options: font_size, defaultValue: config.font_size },
            { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color },
            { label: 'Align', name: 'align', type: 'lookup', options: alignments, defaultValue: config.align },
            { label: 'Line Height', name: 'line_height', type: 'lookup', options: line_heights, defaultValue: config.line_height },
            { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: letter_spacing, defaultValue: config.letter_spacing }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleChange(data) {
    const { section } = this.props
    this.props.onUpdate(`design.${section}`, unflatten(data))
  }

}

export default Preheader
