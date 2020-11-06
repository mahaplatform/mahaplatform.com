import PropTypes from 'prop-types'
import { Image } from '@admin'
import moment from 'moment'
import React from 'react'

class Email extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    status: PropTypes.string,
    onChangeMode: PropTypes.func,
    onEmail: PropTypes.func,
    onSet: PropTypes.func
  }

  email = null

  state = {
    error: false
  }

  _handleNext = this._handleNext.bind(this)
  _handleShake = this._handleShake.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { status } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-avatar">
            <div className="maha-avatar-badge">
              <div className="maha-avatar-wrapper">
                <Image host={ process.env.WEB_ASSET_CDN_HOST } src="/images/maha.png" title="The Maha Platform" transforms={{ fit: 'cover', w: 150, h: 150 }} />
              </div>
            </div>
          </div>
          <h2>The Maha Platform</h2>
          <p>Sign in To Your Account</p>
          <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
            <div className="field email-field">
              <div className="ui input">
                <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Email" type="email" ref={ (node) => this.email = node } />
              </div>
            </div>
            <div className="field button-field">
              <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>Continue</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(null, 'email')
    setTimeout(() => this.email.focus(), 500)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleShake()
      if(status === 'success') this._handleNext()
    }
  }

  _getFormClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animating transition shake')
    return classes.join(' ')
  }

  _getNextMode() {
    const { account } = this.props
    if(account.is_blocked) return 'blocked'
    if(account.locked_out_at && moment().diff(moment(account.locked_out_at), 'seconds') < 60 * 5) return 'lockout'
    return 'password'
  }

  _handleNext() {
    const { account, onChangeMode } = this.props
    const { authentication_strategy } = account
    this.email.blur()
    if(authentication_strategy === 'local') {
      const mode = this._getNextMode()
      setTimeout(() => onChangeMode(mode), 250)
    } else {
      this.context.host.signin(`/admin/auth/${authentication_strategy}`)
    }
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSubmit(e) {
    const email = this.email.value
    this.props.onEmail(email)
    e.preventDefault()
  }

}

export default Email
