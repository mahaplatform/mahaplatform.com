import PropTypes from 'prop-types'
import React from 'react'

class Password extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    show: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
    onChangeMode: PropTypes.func,
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
    const { show } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h2>Choose a Password</h2>
            <p>Enter and confirm the password that you will use to signin.</p>
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
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleShake()
      if(status === 'success') this._handleNext()
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

  _handleBack() {
    this.props.onChangeMode('answer')
  }

  _handleNext() {
    const { account } = this.props
    const { cell_phone, photo } = account
    if(!cell_phone) return this.props.onChangeMode('cell')
    if(!photo) return this.props.onChangeMode('avatar')
    this.props.onChangeMode('notifications')

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
