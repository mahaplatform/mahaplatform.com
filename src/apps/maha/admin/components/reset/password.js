import PropTypes from 'prop-types'
import Avatar from '../avatar'
import React from 'react'

class Password extends React.Component {

  static propTypes = {
    show: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
    user: PropTypes.object,
    onPassword: PropTypes.func,
    onTogglePassword: PropTypes.func
  }

  password = null
  confirmation = null

  state = {
    error: false
  }

  _handleSubmit = this._handleSubmit.bind(this)
  _handleTogglePassword = this._handleTogglePassword.bind(this)

  render() {
    const { show, user } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            { user && <Avatar user={ user } width="150" /> }
            { user && <h2>{ user.full_name }</h2> }
            <h3>Please enter and confirm your new password</h3>
          </div>
          <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
            <div className="field password-field">
              <div className="ui fluid left icon input">
                <i className="lock icon"></i>
                <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Password" type={ show ? 'text' : 'password' } ref={ (node) => this.password = node } />
                <a onClick={ this._handleTogglePassword }>{ show ? 'HIDE' : 'SHOW' }</a>
              </div>
            </div>
            <div className="field password-field">
              <div className="ui fluid left icon input">
                <i className="lock icon"></i>
                <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Confirm" type={ show ? 'text' : 'password' } ref={ (node) => this.confirmation = node } />
                <a onClick={ this._handleTogglePassword }>{ show ? 'HIDE' : 'SHOW' }</a>
              </div>
            </div>
            <div className="field button-field">
              <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>
                Continue <i className="right chevron icon" />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'failure') {
      this._handleShake()
    }
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _getFormClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }

  _handleSubmit(e) {
    const { token, onPassword } = this.props
    this.password.focus()
    const password = this.password.value
    const confirmation = this.confirmation.value
    onPassword(token, password, confirmation)
    e.preventDefault()
  }

  _handleTogglePassword() {
    this.props.onTogglePassword()
  }

}

export default Password
