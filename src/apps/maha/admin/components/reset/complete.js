import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    token: PropTypes.string
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h1><i className="fa fa-check-circle" /></h1>
            <h2>Congratulations!</h2>
            <p>Your password was successfully reset!</p>
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
    const { account, token } = this.props
    this.context.admin.signin({
      id: account.id,
      full_name: account.full_name,
      initials: account.initials,
      email: account.email,
      photo: account.photo,
      token,
      authentication_strategy: account.authentication_strategy
    })
    this.context.router.history.push('/')
  }

}

export default Complete
