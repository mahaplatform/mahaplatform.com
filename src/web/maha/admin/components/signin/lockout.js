import React from 'react'
import PropTypes from 'prop-types'

class Lockout extends React.Component {

  static propTypes = {}

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h1><i className="fa fa-lock" /></h1>
            <h2>Your Account is Locked</h2>
            <p>
              You attempted unsuccessfully to sign into your account 3 times
              and your account has been locked. Please wait for 5 minutes to
              sign in again.
            </p>
          </div>
        </div>
      </div>
    )
  }

}

export default Lockout
