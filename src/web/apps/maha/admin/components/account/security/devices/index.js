import { devices } from './selectors'
import { connect } from 'react-redux'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Device from './device'
import moment from 'moment'
import React from 'react'

class Devices extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    device: PropTypes.object,
    devices: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleClick = this._handleClick.bind(this)

  render() {
    const { devices, device } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-devices">
          <div className="maha-devices-header">
            Over the past 6 months, you have accessed your Maha account on the following devices.
          </div>
          { devices.map((device, index) => (
            <div className="maha-devices-item" key={`device_${device.id}`} onClick={ this._handleClick.bind(this, index) }>
              <div className="maha-devices-item-icon">
                <i className={ `fa fa-fw fa-${device.icon}` } />
              </div>
              <div className="maha-devices-item-label">
                <strong>{ device.display_name }</strong><br />
                { this._getStatus(device) }
              </div>
              <div className="maha-devices-item-presence">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          ))}
        </div>
        { false && device.platform === 'web' &&
          <div className="maha-devices-footer">
            <a href={ this._getAppLink(device) } className="ui pink button icon fluid">
              <div className="button-icon">
                <i className="fa fa-cloud-download" />
              </div>
              <div className="button-label">
                <h3>Download Maha for { this._getAppDevice(device) }</h3>
                <p>The native app is even better than the web experience!</p>
              </div>
            </a>
          </div>
        }
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Devices',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getAppLink(device) {
    if(device.os === 'mac os') return 'https://assets.mahaplatform.com/releases/maha-mac-0.2.0.dmg'
    if(device.os === 'windows') return 'https://assets.mahaplatform.com/releases/maha-win-0.2.0.exe'
    if(device.os === 'ios') return 'https://appstore.com/facebook'
    if(device.os === 'android') return 'https://play.google.com/store/apps/details?id=com.example.android'
  }

  _getAppDevice(device) {
    if(device.os === 'mac os') return 'Mac OS'
    if(device.os === 'windows') return 'Windows'
    if(device.os === 'ios' && device.device === 'mobile') return 'iPhone'
    if(device.os === 'ios' && device.device === 'tablet') return 'iPad'
    if(device.os === 'android') return 'Android'
  }

  _getStatus(device) {
    if(device.fingerprint === this.props.device.fingerprint) return <em>THIS DEVICE</em>
    if(device.status === 'active' ) return <span>Active now</span>
    return <span>Last active { moment(device.last_active_at).fromNow() }</span>
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleClick(index) {
    const device = this.props.devices[index]
    const is_this_device = device.fingerprint === this.props.device.fingerprint
    this.context.modal.push(<Device { ...device } is_this_device={ is_this_device } />)
  }

}

const mapStateToProps = (state, props) => ({
  device: state.maha.device,
  devices: devices(state, props)
})

export default connect(mapStateToProps)(Devices)
