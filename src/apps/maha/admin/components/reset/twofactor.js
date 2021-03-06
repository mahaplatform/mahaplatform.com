import { Avatar, TextField } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class TwoFactor extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    verification: PropTypes.object,
    onChangeMode: PropTypes.func
  }

  state = {
    code: null,
    sent: false
  }

  _handleChange = this._handleChange.bind(this)
  _handleSend = this._handleSend.bind(this)
  _handleSkip = this._handleSkip.bind(this)
  _handleVerify = this._handleVerify.bind(this)

  render() {
    const { account } = this.props
    const { sent } = this.state
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          { account && <Avatar user={ account } width="150" /> }
          { account && <h2>{ account.full_name }</h2> }
          <p>Hi { account.first_name }. Before we can reset your password, we
          need to verify you with a push message.</p>
          <div className={ this._getFormClass() }>
            { sent &&
              <div className="field">
                <TextField { ...this._getTextField() } />
              </div>
            }
            { sent ?
              <div className="field button-field" onClick={ this._handleVerify }>
                <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>
                  Verify Code
                </button>
              </div> :
              <div className="field button-field" onClick={ this._handleSend }>
                <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>
                  Send Verification Code
                </button>
              </div>
            }
          </div>
          { !sent &&
            <div className="maha-signin-footer">
              <p><a onClick={ this._handleSkip }>Don&apos;t have your phone?</a></p>
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { error } = this.state
    if(error !== prevState.error && error !== null) {
      this._handleShake()
    }
  }

  _getFormClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animating transition shake')
    return classes.join(' ')
  }

  _getTextField() {
    return {
      placeholder: 'Enter verification Code',
      onChange: this._handleChange.bind(this, 'code')
    }
  }

  _handleBack() {
    this.props.onChangeMode('answer')
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSkip() {
    this.props.onChangeMode('security')
  }

  _handleSend() {
    const { token } = this.props
    this.context.network.request({
      type: 'API_REQUEST',
      method: 'POST',
      endpoint: '/api/admin/reset/twofactor/authorize',
      body: { token },
      onSuccess: () => {
        this.setState({ sent: true })
      },
      onFailure: ({ data }) => {
        this.setState({ error: data.message })
        this.context.flash.set('error', data.message)
      }
    })
  }

  _handleVerify() {
    const { code } = this.state
    const { token } = this.props
    this.context.network.request({
      type: 'API_REQUEST',
      method: 'POST',
      endpoint: '/api/admin/reset/twofactor/verify',
      body: { token, code },
      onSuccess: () => {
        this.props.onChangeMode('password')
      },
      onFailure: ({ data }) => {
        this.setState({ error: data.message })
        this.context.flash.set('error', data.message)
      }
    })
  }

}

export default TwoFactor
