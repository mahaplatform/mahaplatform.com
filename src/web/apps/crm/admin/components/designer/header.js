import { devices, orientations } from './viewport'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.PureComponent {

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
      onChange: this._handleChange.bind(this, 'device')
    }
  }

  _getOrientation() {
    return {
      onChange: this._handleChange.bind(this, 'orientation')
    }
  }

  _handleChange(key, e) {
    const value = parseInt(e.target.value)
    this.props.onChange(key, value)
  }

}

export default Header
