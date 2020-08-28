import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    team: PropTypes.object,
    token: PropTypes.string,
    user: PropTypes.object
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h1><i className="fa fa-check-circle" /></h1>
            <h2>Congratulations!</h2>
            <p>
              Your account has been successfully activated! You may now begin
              using the Maha Platform.
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
    const { admin } = this.context
    const { team, token, user } = this.props
    admin.signin(team, token, user)
  }

}

export default Complete
