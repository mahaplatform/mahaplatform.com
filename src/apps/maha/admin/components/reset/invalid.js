import React from 'react'

class Invalid extends React.Component {

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h1><i className="fa fa-warning" /></h1>
            <h2>Invalid Reset Link</h2>
            <h3>This link is invalid or has expired</h3>
          </div>
        </div>
      </div>
    )
  }

}

export default Invalid
