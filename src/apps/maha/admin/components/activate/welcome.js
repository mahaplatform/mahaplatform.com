import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import React from 'react'

class Welcome extends React.Component {

  static propTypes = {
    account: PropTypes.object,
    team: PropTypes.object,
    user: PropTypes.object,
    onChangeMode: PropTypes.func
  }

  _handleNext = this._handleNext.bind(this)

  render() {
    const { team, account } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <div className="maha-avatar">
              <div className="maha-avatar-badge">
                <div className="maha-avatar-wrapper">
                  <Image host={ process.env.WEB_ASSET_CDN_HOST } src="/images/maha.png" title="The Maha Platform" transforms={{ fit: 'cover', w: 150, h: 150 }} />
                </div>
              </div>
            </div>
            <h2>The Maha Platform</h2>
            <p>
              Hi { account.first_name} and welcome to the Maha Platform! Thank you
              for verifying your email address. Let&apos;s take a few moments to set
              up your account for <strong>{ team.title }</strong>.
            </p>
            <div className="field button-field">
              <button className="ui fluid large button" onClick={ this._handleNext }>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleNext() {
    const { account } = this.props
    const { activated_at, authentication_strategy, cell_phone, photo } = account
    if(!activated_at && authentication_strategy === 'local') return this.props.onChangeMode('question')
    if(!cell_phone) return this.props.onChangeMode('cell')
    if(!photo) return this.props.onChangeMode('avatar')
    this.props.onChangeMode('notifications')
  }

}

export default Welcome
