import React from 'react'
import PropTypes from 'prop-types'

class Blocked extends React.Component {

  static propTypes = {}

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h1><i className="fa fa-ban" /></h1>
            <h2>Your Account is Blocked</h2>
            <p>
              Your account has been blocked from signing in. Please contact
              us at <a href="mailto:support@mahaplatform.com">support@mahaplatform.com</a> to
              rehabilitate your account.
            </p>
          </div>
        </div>
      </div>
    )
  }

}

export default Blocked
