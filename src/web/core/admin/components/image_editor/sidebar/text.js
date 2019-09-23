import PropTypes from 'prop-types'
import Form from '../../form'
import React from 'react'

export const fonts = [
  { value: 'Arial, Helvetica, sans-serif', text: 'Arial' },
  { value: '"Comic Sans MS", cursive, sans-serif', text: 'Comic Sans' },
  { value: '"Courier New", Courier, monospace', text: 'Courier New' },
  { value: 'Georgia, serif', text: 'Georgia' },
  { value: '"Helvetica Neue", Helvetica, Arial, Verdana, sans-serif', text: 'Helvetica' },
  { value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', text: 'Lucida' },
  { value: 'Tahoma, Geneva, sans-serif', text: 'Tahoma' },
  { value: '"Times New Roman", Times, serif', text: 'Times New Roman' },
  { value: '"Trebuchet MS", Helvetica, sans-serif', text: 'Trebuchet MS' },
  { value: 'Verdana, Geneva, sans-serif', text: 'Verdana' }
]

export const font_size = [9,10,11,12,13,14,16,18,20,22,24,28,30,36,48,60,72].map(value => `${value}px`)

class Text extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Text',
      onChange: this._handleChange,
      onCancel: this._handleBack,
      cancelText: <i className="fa fa-chevron-left" />,
      color: 'grey',
      saveText: null,
      sections: [
        {
          fields: [
            { label: 'Text', name: 'value', type: 'textfield', placeholder: 'Enter overlay text', defaultValue: null },
            { label: 'Font Family', name: 'font', type: 'lookup', options: fonts, defaultValue: null },
            { label: 'Font Size', name: 'size', type: 'lookup', options: font_size, defaultValue: null },
            { label: 'Color', name: 'color', type: 'colorfield', defaultValue: null },
            { label: 'Line Color', name: 'line_color', type: 'colorfield', defaultValue: null },
            { label: 'Line Width', name: 'line_width', type: 'range', min: 0, max: 20, defaultValue: null }
          ]
        }
      ]
    }
  }

  _handleChange(value) {
    this.props.onAdjust('text', value)
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default Text
