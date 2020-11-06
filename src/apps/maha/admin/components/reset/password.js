import { Avatar } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Password extends React.Component {

  static propTypes = {
    account: PropTypes.object,
    show: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
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
    const { show, account } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            { account && <Avatar user={ account } width="150" /> }
            { account && <h2>{ account.full_name }</h2> }
            <p>Please enter and confirm your new password</p>
          </div>
          <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
            <div className="field password-field">
              <div className="ui input">
                <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Password" type={ show ? 'text' : 'password' } ref={ (node) => this.password = node } />
                <a onClick={ this._handleTogglePassword }>{ show ? 'HIDE' : 'SHOW' }</a>
              </div>
            </div>
            <div className="field password-field">
              <div className="ui input">
                <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Confirm" type={ show ? 'text' : 'password' } ref={ (node) => this.confirmation = node } />
                <a onClick={ this._handleTogglePassword }>{ show ? 'HIDE' : 'SHOW' }</a>
              </div>
            </div>
            <div className="field button-field">
              <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>
                Continue
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
    if(error) classes.push('animating transition shake')
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
