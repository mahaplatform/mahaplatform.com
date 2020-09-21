import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    team: PropTypes.object,
    token: PropTypes.string,
    user: PropTypes.object
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { team } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h1><i className="fa fa-check-circle" /></h1>
            <h2>Congratulations!</h2>
            <p>
              Your account for <strong>{ team.title }</strong> has been
              successfully activated! You may now begin using the Maha Platform.
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
    const { account, team } = this.props
    this.context.admin.signin(account, team.id)
  }

}

export default Complete
