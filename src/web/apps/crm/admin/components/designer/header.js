import { devices, orientations } from './variables'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    onChange: PropTypes.func
  }

  render() {
    return (
      <div className="designer-header">
        <select { ...this._getDevice() }>
          { devices.map((device, index) => (
            <option key={`device_${index}`} value={ index }>
              { device.label}
            </option>
          ))}
        </select>
        <select { ...this._getOrientation() }>
          { orientations.map((orientation, index) => (
            <option key={`orientation_${index}`} value={ index }>
              { orientation.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  _getDevice() {
    return {
      className: 'ui selection dropdown',
      onChange: this._handleChange.bind(this, 'device')
    }
  }

  _getOrientation() {
    const { deviceIndex} = this.props
    return {
      className: deviceIndex === 0 ? 'ui disabled selection dropdown' : 'ui selection dropdown',
      disabled: deviceIndex === 0,
      onChange: this._handleChange.bind(this, 'orientation')
    }
  }

  _handleChange(key, e) {
    const value = parseInt(e.target.value)
    this.props.onChange(key, value)
  }

}

export default Header
