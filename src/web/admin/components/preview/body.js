import { devices, orientations, scales } from './variables'
import PropTypes from 'prop-types'
import React from 'react'

class Body extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    scaleIndex: PropTypes.number,
    onChange: PropTypes.func
  }

  render() {
    const { children } = this.props
    return (
      <div className={ this._getClass() }>
        <div { ...this._getFrame() }>
          { children }
        </div>
      </div>
    )
  }

  _getClass() {
    const { deviceIndex } = this.props
    const device = devices[deviceIndex]
    return `preview-body ${device.type}`
  }

  _getFrame() {
    const { deviceIndex, orientationIndex, scaleIndex } = this.props
    const portrait = orientations[orientationIndex].label === 'Portrait'
    const scale = scales[scaleIndex].value
    const device = devices[deviceIndex]
    return {
      className: 'preview-frame',
      style: {
        width: portrait ? device.width : device.height,
        height: portrait ? device.height : device.width,
        transform: `scale(${scale})`
      }
    }
  }

}

export default Body
