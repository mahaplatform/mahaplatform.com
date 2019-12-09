import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static propTypes = {
    payment: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onChoose: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    ready: false
  }

  _handleCheck = this._handleCheck.bind(this)
  _handlePayment = this._handlePayment.bind(this)

  render() {
    if(!this.state.ready) return null
    return (
      <div className="googlepay-button">
        <button className="gpay-button black short" onClick={ this._handlePayment } />
      </div>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps) {
    const { payment, onSuccess } = this.props
    if(payment !== prevProps.payment) {
      onSuccess(payment)
    }
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

  _handlePayment() {
    const { summary, token, onChoose, onSubmit } = this.props
    onChoose('googlepay')
    onSubmit(token, summary)
  }

}

export default Card
