import ModalPanel from '../../modal_panel'
import Range from '../../form/range'
import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'
import _ from 'lodash'

class Adjustment extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    transforms: PropTypes.object,
    onAdjust: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor-panel">
          Brightness
          <Range { ...this._getRange('bri') } />
          Contrast
          <Range { ...this._getRange('con') } />
          Exposure
          <Range { ...this._getRange('exp') } />
          Hue
          <Range { ...this._getRange('hue') } />
          Vibrance
          <Range { ...this._getRange('vibrance') } />
          Saturation
          <Range { ...this._getRange('sat') } />
          <Button { ...this._getRotate('CW', 90) } />
          <Button { ...this._getRotate('CCW', -90) } />
          <Button { ...this._getFlip('v') } />
          <Button { ...this._getFlip('h') } />
        </div>
      </ModalPanel>
    )
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getPanel() {
    return {
      title: 'Adjustments',
      color: 'grey'
    }
  }

  _getRange(key) {
    return {
      min: -100,
      max: 100,
      onChange: this._handleAdjust.bind(this, key)
    }
  }

  _getRotate(direction, degrees) {
    const { transforms } = this.props
    const rot = (transforms.rot || 0) + degrees
    return {
      label: `Rotate 90 ${direction}`,
      handler: this._handleAdjust.bind(this, 'rot', rot)
    }
  }

  _getFlip(axis) {
    const { transforms } = this.props
    const flip = transforms.flip ? [...transforms.flip] : []
    const value = axis ? _.xor(flip, [axis]).join('') : axis
    return {
      label: `Flip ${axis}`,
      handler: this._handleAdjust.bind(this, 'flip', value)
    }
  }

  _handleAdjust(key, value) {
    this.props.onAdjust(key, value)
  }

}

export default Adjustment
