import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Form from '../../form'
import React from 'react'

class Adjustment extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { transforms } = this.props
    return {
      title: 'Adjustments',
      onChangeField: this._handleChangeField,
      onCancel: this._handleBack,
      cancelIcon: 'chevron-left',
      color: 'grey',
      saveText: null,
      sections: [
        {
          fields: [
            { label: 'Brightness', name: 'bri', type: 'range', min: -100, max: 100, defaultValue: transforms.bri || 0 },
            { label: 'Contrast', name: 'con', type: 'range', min: -100, max: 100, defaultValue: transforms.con || 0 },
            { label: 'Exposure', name: 'exp', type: 'range', min: -100, max: 100, defaultValue: transforms.exp || 0 },
            { label: 'Hue', name: 'hue', type: 'range', min: -100, max: 100, defaultValue: transforms.hue || 0 },
            { label: 'Vibrance', name: 'vibrance', type: 'range', min: -100, max: 100, defaultValue: transforms.vibrance || 0 },
            { label: 'Saturation', name: 'saturation', type: 'range', min: -100, max: 100, defaultValue: transforms.sat || 0 },
            { label: 'Sharpen', name: 'sharpen', type: 'range', min: 0, max: 100, defaultValue: transforms.vibrance || 0 },
            { label: 'Blur', name: 'blur', type: 'range', min: 0, max: 180, defaultValue: transforms.sat || 0 }
          ]
        }
      ]
    }
  }

  _getPanel() {
    return {
      title: 'Adjustments',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getRange(key, min, max) {
    return {
      min,
      max,
      onChange: this._handleAdjust.bind(this, key)
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChangeField(key, value) {
    this.props.onAdjust(key, value)
  }

}

const mapStateToProps = (state, props) => ({
  transforms: state.maha.image_editor.transforms
})

export default connect(mapStateToProps)(Adjustment)
