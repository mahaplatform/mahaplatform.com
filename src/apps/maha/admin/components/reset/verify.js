import PropTypes from 'prop-types'
import React from 'react'

class Verify extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    verification: PropTypes.object,
    onChangeMode: PropTypes.func,
    onVerify: PropTypes.func
  }

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <p><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" /></p>
            <h2>Verifying Reset Link...</h2>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { pathname } = this.context.router.location
    const { onVerify } = this.props
    const [,token] = pathname.match(/^\/reset\/(.*)/)
    onVerify(token)
  }

  componentDidUpdate(prevProps) {
    const { verification } = this.props
    if(verification !== prevProps.verification && verification) {
      this._handleNext()
    }
  }

  _handleNext() {
    const { verification } = this.props
    this.props.onChangeMode(verification.strategy)
  }

}

export default Verify
