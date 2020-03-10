import { PhoneField, TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Cell extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object
  }

  static propTypes = {
    question: PropTypes.object,
    show: PropTypes.bool,
    status: PropTypes.string,
    team: PropTypes.object,
    token: PropTypes.string,
    user: PropTypes.object,
    onChangeMode: PropTypes.func,
    onAuthorizeCell: PropTypes.func,
    onVerifyCell: PropTypes.func
  }

  state = {
    cell_phone: null,
    code: null,
    sent: false,
    error: false
  }

  _handleChange = this._handleChange.bind(this)
  _handleSend = this._handleSend.bind(this)
  _handleSkip = this._handleSkip.bind(this)
  _handleVerify = this._handleVerify.bind(this)

  render() {
    const { sent } = this.state
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h2>Cell Phone</h2>
            <p>Maha can send you text messages when your attention is needed. Please enter your number so we can verify your phone.</p>
          </div>
          <div className={ this._getFormClass() }>
            { sent ?
              <div className="field">
                <TextField { ...this._getTextField() } />
              </div> :
              <div className="field">
                <PhoneField { ...this._getPhoneField() } />
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
          <div className="maha-signin-footer">
            { sent ?
              <p><a onClick={ this._handleSend }>Resend Code</a></p> :
              <p><a onClick={ this._handleSkip }>Skip for now</a></p>
            }
          </div>
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

  _getFormClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }

  _getPhoneField() {
    return {
      onChange: this._handleChange.bind(this, 'cell_phone')
    }
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
    this.props.onChangeMode('avatar')
  }

  _handleSend() {
    const { cell_phone } = this.state
    const { token } = this.props
    this.setState({ sent: true })
    this.props.onAuthorizeCell(token, cell_phone)
  }

  _handleVerify() {
    const { code } = this.state
    const { token } = this.props
    this.props.onVerifyCell(token, code)
  }

}

export default Cell
