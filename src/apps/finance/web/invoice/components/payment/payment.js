import { Stack } from '@public'
import PropTypes from 'prop-types'
import Methods from './methods'
import React from 'react'

class Payment extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    onDone: PropTypes.func,
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
    return (
      <div className={ this._getClass() }>
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    const { invoice } = this.props
    this.props.onToken(invoice.code)
    this._handlePush(Methods, this._getMethods.bind(this))
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'success') this._handleDone()
    }
  }

  _getClass() {
    const { status } = this.props
    const classes = ['finance-payment']
    if(status === 'saving') classes.push('ui form loading')
    return classes.join(' ')
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

  _handleDone() {
    this.context.modal.close()
    this.props.onDone()
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
