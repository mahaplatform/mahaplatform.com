import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../avatar'

class Password extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    show: PropTypes.bool,
    status: PropTypes.string,
    team: PropTypes.object,
    token: PropTypes.string,
    user: PropTypes.object,
    onLockout: PropTypes.func,
    onPassword: PropTypes.func,
    onForgot: PropTypes.func,
    onSet: PropTypes.func,
    onTogglePassword: PropTypes.func
  }

  password = null

  state = {
    attempts: 0,
    clear: false,
    error: false
  }

  _handleBack = this._handleBack.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleForgot = this._handleForgot.bind(this)
  _handleShake = this._handleShake.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleTogglePassword = this._handleTogglePassword.bind(this)

  render() {
    const { show, status, user } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-header">
            <Avatar user={ user } width="150" presence={ false } />
            <h2>{ user.full_name }</h2>
            <p>{ user.email }</p>
          </div>
          <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
            <div className="field password-field">
              <div className="ui fluid left icon input">
                <i className="lock icon"></i>
                <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Password" type={ show ? 'text' : 'password' } onFocus={ this._handleFocus } ref={ (node) => this.password = node } />
                <a onClick={ this._handleTogglePassword }>{ show ? 'HIDE' : 'SHOW' }</a>
              </div>
            </div>
            <div className="field button-field">
              <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>Signin</button>
            </div>
          </form>
          <div className="maha-signin-footer">
            <p><a onClick={ this._handleBack }>Not you?</a></p>
            <p><a onClick={ this._handleForgot }>Forgot your password?</a></p>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(this.props.team, this.props.user, 'password')
    setTimeout(() => this.password.focus(), 500)
  }

  componentDidUpdate(prevProps, prevState) {
    const { flash } = this.context
    const { status } = this.props
    const { attempts } = this.state
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleFailure()
      if(status === 'reset') flash.set('info', 'Please check your email for password reset instructions')
    }
    if(attempts !== prevState.attempts && attempts === 3) this._handleLockout()
  }

  _getFormClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }

  _handleBack() {
    const { team, onSet } = this.props
    this.password.blur()
    setTimeout(() => onSet(team, null, 'email'), 250)
  }

  _handleFailure() {
    const attempts = this.state.attempts + 1
    if(attempts < 3) this._handleShake()
    this.setState({ attempts, clear: true })
  }

  _handleFocus() {
    if(!this.state.clear) return
    this.password.value = ''
    this.setState({ clear: false })
  }

  _handleForgot() {
    const { team, user, onForgot } = this.props
    onForgot(team.id, user.email)
  }

  _handleLockout() {
    const { team, user, onLockout } = this.props
    onLockout(team.id, user.email)
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSubmit(e) {
    e.preventDefault()
    const { team, user, onPassword } = this.props
    const password = this.password.value
    if(password.length === 0) return
    onPassword(team.id, user.email, password)
  }

  _handleTogglePassword() {
    this.props.onTogglePassword()
  }

}

export default Password
