import { devices, orientations } from './variables'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onEditable: PropTypes.func
  }

  _handleEditable = this._handleEditable.bind(this)

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
        <select { ...this._getEditable() }>
          <option value="true">
            Editable
          </option>
          <option value="false">
            Read Only
          </option>
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

  _handleEditable = this._handleEditable.bind(this)

  _getEditable() {
    return {
      className: 'ui selection dropdown',
      onChange: this._handleEditable
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

  _handleEditable(e) {
    this.props.onEditable(e.target.value === 'true')
  }

}

export default Header
