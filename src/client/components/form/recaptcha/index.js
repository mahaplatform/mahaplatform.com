import Dependencies from '../../dependencies'
import PropTypes from 'prop-types'
import React from 'react'

class Recaptcha extends React.Component {

  static propTypes = {
    tabIndex: PropTypes.number,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
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
    this._handleCheck()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready } = this.state
    if(prevState.ready !== ready) {
      this._handleInit()
    }
  }

  _handleCheck() {
    const ready = typeof window !== 'undefined' && typeof window.grecaptcha !== 'undefined' && typeof window.grecaptcha.render === 'function'
    this.setState({ ready })
    if(!ready) setTimeout(this._handleCheck, 1000)
  }

  _handleInit() {
    const { tabIndex } = this.props
    this.id = window.grecaptcha.render(this.recaptcha, {
      badge: 'bottomright',
      callback: this._handleSuccess,
      isolated: false,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
      size: 'normal',
      tabindex: tabIndex,
      theme: 'light'
    }, true)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

const dependencies = {
  scripts: [
    { url: 'https://www.google.com/recaptcha/api.js', check: 'grecaptcha' }
  ]
}

Recaptcha = Dependencies(dependencies)(Recaptcha)

export default Recaptcha
