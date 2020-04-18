import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import React from 'react'

class Welcome extends React.Component {

  static propTypes = {
    team: PropTypes.object,
    user: PropTypes.object,
    onChangeMode: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { user } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <div className="maha-avatar">
              <div className="maha-avatar-badge">
                <div className="maha-avatar-wrapper">
                  <Image host={ process.env.WEB_ASSET_CDN_HOST } src="/admin/images/maha.png" title="The Maha Platform" transforms={{ fit: 'cover', w: 150, h: 150 }} />
                </div>
              </div>
            </div>
            <h2>The Maha Platform</h2>
            <p>
              Hi { user.first_name} and welcome to the Maha Platform! Thank you
              for verifying your email address. Let&apos;s take a few moments to set
              up your account.
            </p>
            <div className="field button-field">
              <button className="ui fluid large button" onClick={ this._handleClick }>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleClick() {
    const { team } = this.props
    if(team.authentication_strategy === 'local') return this.props.onChangeMode('question')
    this.props.onChangeMode('cell')
  }

}

export default Welcome
