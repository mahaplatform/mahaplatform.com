import Range from '../../form/range'
import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'

class Toolbar extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onAdjust: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <div className="maha-photoeditor-toolbar">
        Brightness
        <Range { ...this._getRange('bri') } />
        Contrast
        <Range { ...this._getRange('con') } />
        Vibrance
        <Range { ...this._getRange('vibrance') } />
        Saturation
        <Range { ...this._getRange('sat') } />
        <Button { ...this._getRotate() } />
      </div>
    )
  }

  _getRange(key) {
    return {
      min: -100,
      max: 100,
      onChange: this._handleAdjust.bind(this, key)
    }
  }

  _getRotate() {
    return {
      label: 'Rotate 90 CW',
      handler: this._handleAdjust.bind(this, 'rot', 90)
    }
  }

  _handleAdjust(key, value) {
    this.props.onAdjust(key, value)
  }

}

export default Toolbar
