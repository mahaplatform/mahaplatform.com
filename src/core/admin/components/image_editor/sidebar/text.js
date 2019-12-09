import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Form from '../../form'
import React from 'react'

class Text extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const text = this.props.transforms.text || {}
    return {
      title: 'Text',
      onChange: this._handleChange,
      onCancel: this._handleBack,
      cancelIcon: 'chevron-left',
      color: 'grey',
      saveText: null,
      sections: [
        {
          fields: [
            { label: 'Text', name: 'value', type: 'textfield', placeholder: 'Enter overlay text', defaultValue: text.value },
            { label: 'Font Family', name: 'font', type: 'fontfamilyfield', value: 'text', defaultValue: text.font || 'Arial' },
            { label: 'Font Size', name: 'size', type: 'fontsizefield', defaultValue: text.size || 60 },
            { label: 'Padding', name: 'padding', type: 'range', min: 0, max: 50, defaultValue: text.padding },
            { label: 'Color', name: 'color', type: 'colorfield', defaultValue: text.color || '#FFFFFF' },
            { label: 'Line Color', name: 'line_color', type: 'colorfield', defaultValue: text.line_color },
            { label: 'Line Width', name: 'line_width', type: 'range', min: 0, max: 10, defaultValue: text.line_width },
            { label: 'Align', name: 'align', type: 'textfield', defaultValue: text.align || 'center' },
            { label: 'Baseline', name: 'baseline', type: 'textfield', defaultValue: text.baseline || 'middle' }
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

const mapStateToProps = (state, props) => ({
  transforms: state.maha.image_editor.transforms
})

export default connect(mapStateToProps)(Text)
