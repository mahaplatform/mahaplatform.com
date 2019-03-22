import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Offer extends React.Component {

  static propTypes = {
    device: PropTypes.object
  }

  render() {
    const { device } = this.props
    return (
      <div className="maha-device-offer">
        <div className="maha-device-offer-panel">
          <h2>{ this._getTitle() }</h2>
          <p>Stay signed in at all times, receive push notifications, and access Maha at any time on your phone.</p>
          <img src={`/images/offer/${device.device}.png`} className={`maha-device-offer-device ${device.device}`}  />
          <div className="maha-device-offer-button">
            { device.device === 'desktop' &&
              <div className="ui red button">
                Download for { this._getOS() }
              </div>
            }
            { device.device === 'mobile' &&
              <img src={`/images/offer/${device.os}.png`} />
            }
          </div>
          <div className="maha-device-offer-link">
            No thanks, take me to the web
          </div>
        </div>
      </div>
    )
  }

  _getTitle() {
    const { device } = this.props
    return (device.device === 'mobile') ? 'Maha for Mobile' : 'Maha for Desktop'
  }

  _getOS() {
    const { device } = this.props
    if(device.os === 'mac os') return 'Mac OS X'
    if(device.os === 'windows') return 'Windows'
  }

}

const mapStateToProps = (state, props) => ({
  device: state.maha.device
})

export default connect(mapStateToProps)(Offer)
