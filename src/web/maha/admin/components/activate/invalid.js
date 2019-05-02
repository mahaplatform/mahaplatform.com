import React from 'react'
import PropTypes from 'prop-types'

class Invalid extends React.Component {

  static propTypes = {
    message: PropTypes.string
  }

  render() {
    const { message } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h1><i className="fa fa-warning" /></h1>
            <h2>There was a problem</h2>
            <h3>{ message }</h3>
          </div>
        </div>
      </div>
    )
  }

}

export default Invalid
