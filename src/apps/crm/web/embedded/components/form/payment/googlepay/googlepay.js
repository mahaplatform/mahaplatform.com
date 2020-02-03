import PropTypes from 'prop-types'
import React from 'react'

class GooglePay extends React.Component {

  static propTypes = {
    error: PropTypes.string,
    form: PropTypes.object,
    isProcessing: PropTypes.bool,
    payment: PropTypes.object,
    status: PropTypes.string,
    summary: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    ready: false
  }

  _handleCheck = this._handleCheck.bind(this)
  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { isProcessing } = this.props
    const { ready } = this.state
    return (
      <div className="googlepay-button">
        { !ready &&
          <span>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" />
          </span>
        }
        { ready && !isProcessing &&
          <button className="gpay-button black short" onClick={ this._handleAuthorize } />
        }
        { ready && isProcessing &&
          <span>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Processing
          </span>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, status } = this.props
    if(error !== prevProps.error && error) {
      this.setState({ error })
    }
    if(status !== prevProps.status) {
      if(status === 'authorized') {
        this._handleSubmit()
      }
      if(status === 'success') {
        this._handleSuccess()
      }
    }
  }

  _handleAuthorize() {
    const { summary, token } = this.props
    this.props.onAuthorize(token, summary)
  }

  _handleCheck() {
    const ready = typeof window !== 'undefined' && typeof window.google !== 'undefined'
    this.setState({ ready })
    if(!ready) setTimeout(this._handleCheck, 1000)
  }

  _handleLoad() {
    const ready = typeof window !== 'undefined' && typeof window.google !== 'undefined'
    if(ready) return this.setState({ ready })
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pay.google.com/gp/p/js/pay.js'
    document.body.appendChild(script)
    setTimeout(this._handleCheck, 1000)
  }

  _handleSubmit() {
    const { form, payment, summary } = this.props
    const { token, code, data } = form
    const body = {
      ...data,
      payment: {
        amount: summary.total,
        method: 'googlepay',
        payment
      }
    }
    this.props.onSubmit(token, code, body)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default GooglePay
