import { devices, orientations } from './variables'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onChange: PropTypes.func
  }

  static defaultProps = {}

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

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getDevice() {
    return {
      className: 'ui selection dropdown',
      onChange: this._handleChange.bind(this, 'device')
    }
  }

  _getOrientation() {
    return {
      className: 'ui selection dropdown',
      onChange: this._handleChange.bind(this, 'orientation')
    }
  }

  _handleChange(key, e) {
    const value = parseInt(e.target.value)
    this.props.onChange(key, value)
  }

}

export default Header
