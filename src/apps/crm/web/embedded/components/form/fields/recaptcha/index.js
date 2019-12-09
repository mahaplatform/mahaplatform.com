import PropTypes from 'prop-types'
import React from 'react'

class Recaptcha extends React.Component {

  static propTypes = {
    onSuccess: PropTypes.func
  }

  recaptcha = null

  state = {
    ready: false
  }

  _handleCheck = this._handleCheck.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { ready } = this.state
    if(!ready) return null
    return (
      <div className="maha-recaptcha">
        <div ref={ node => this.recaptcha = node } />
      </div>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready } = this.state
    if(prevState.ready !== ready) {
      this._handleRender()
    }
  }

  _handleCheck() {
    const ready = typeof window !== 'undefined' && typeof window.grecaptcha !== 'undefined' && typeof window.grecaptcha.render === 'function'
    this.setState({ ready })
    if(!ready) setTimeout(this._handleCheck, 1000)
  }

  _handleLoad() {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = 'https://www.google.com/recaptcha/api.js'
    document.body.appendChild(script)
    setTimeout(this._handleCheck, 1000)
  }

  _handleRender() {
    this.id = window.grecaptcha.render(this.recaptcha, {
      badge: 'bottomright',
      callback: this._handleSuccess,
      isolated: false,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
      size: 'normal',
      theme: 'light'
    }, true)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default Recaptcha
