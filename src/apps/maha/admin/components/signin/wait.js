import PropTypes from 'prop-types'
import React from 'react'

class Wait extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    signin_id: PropTypes.string
  }

  _handleSignin = this._handleSignin.bind(this)

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
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _handleJoin() {
    const { network } = this.context
    const channel = `/admin/signin/${this.props.signin_id}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'signin', handler: this._handleSignin}
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = `/admin/signin/${this.props.signin_id}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'signin', handler: this._handleSignin }
    ])
  }

  _handleSignin(data) {
    const { admin, router } = this.context
    const { team, token, user } = data
    admin.signin(team, token, user)
    router.history.push('/admin')
  }

}

export default Wait
