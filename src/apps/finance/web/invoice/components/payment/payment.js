import { Stack } from 'maha-public'
import PropTypes from 'prop-types'
import Methods from './methods'
import React from 'react'

class Payment extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    token: PropTypes.string,
    onToken: PropTypes.func,
    onPay: PropTypes.func
  }

  static defaultProps = {}

  state = {
    cards: []
  }

  _handlePay = this._handlePay.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    const { invoice } = this.props
    this.props.onToken(invoice.code)
    this._handlePush(Methods, this._getMethods.bind(this))
  }

  _getMethods() {
    const { invoice, token } = this.props
    return {
      invoice,
      token,
      onDone: this._handlePay,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handlePay(payment) {
    const { invoice } = this.props
    this.props.onPay(invoice.code, payment)
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

}

export default Payment
