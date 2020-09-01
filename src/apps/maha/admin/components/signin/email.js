import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Email extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    status: PropTypes.string,
    team: PropTypes.object,
    user: PropTypes.object,
    onChangeMode: PropTypes.func,
    onEmail: PropTypes.func,
    onSet: PropTypes.func
  }

  email = null

  state = {
    error: false
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleShake = this._handleShake.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { status, team } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-header">
            <Logo host="" team={ team } width="150" />
            <h2>{ team.title }</h2>
          </div>
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
          <div className="maha-signin-footer">
            <p><a onClick={ this._handleBack }>Wrong team?</a></p>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(this.props.team, null, 'email')
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
    const { user } = this.props
    if(user.is_blocked) return 'blocked'
    if(user.locked_out_at && moment().diff(moment(user.locked_out_at), 'seconds') < 60 * 5) return 'lockout'
    return 'password'
  }

  _handleBack() {
    const { onSet } = this.props
    this.email.blur()
    setTimeout(() => onSet(null, null, 'team'), 250)
  }

  _handleNext() {
    const { onChangeMode } = this.props
    this.email.blur()
    const mode = this._getNextMode()
    setTimeout(() => onChangeMode(mode), 250)
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSubmit(e) {
    const { team, onEmail } = this.props
    const email = this.email.value
    onEmail(team.id, email)
    e.preventDefault()
  }

}

export default Email
