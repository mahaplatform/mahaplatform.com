import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Security extends React.Component {

  static propTypes = {
    account: PropTypes.object,
    question: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    onSecurity: PropTypes.func
  }

  answer = null

  state = {
    error: false
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { account, question } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          { account && <Avatar user={ account } width="150" /> }
          { account && <h2>{ account.full_name }</h2> }
          <p>Hi { account.first_name }. Before we can reset your password, Please
          answer the following security question to prove your identity.</p>
          <p>{ question.text }</p>
          <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
            <div className="field email-field">
            </div>
            <div className="field text-field">
              <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Answer" type="text" ref={ (node) => this.answer = node } />
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
    const { token, onSecurity } = this.props
    this.answer.focus()
    const answer = this.answer.value
    onSecurity(token, answer)
    e.preventDefault()
  }

}

export default Security
