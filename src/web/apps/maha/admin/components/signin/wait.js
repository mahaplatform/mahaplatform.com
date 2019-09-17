import PropTypes from 'prop-types'
import React from 'react'

class Wait extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    onVerify: PropTypes.func
  }

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <p><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" /></p>
            <h2>Awaiting signin...</h2>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
  }

}

export default Wait
