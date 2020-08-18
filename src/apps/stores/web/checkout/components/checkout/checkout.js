import { Stack, Steps } from 'maha-client'
import ShippingStep from './shipping'
import ContactStep from './contact'
import PaymentStep from './payment'
import PropTypes from 'prop-types'
import Complete from './complete'
import Summary from './summary'
import Pasteur from 'pasteur'
import React from 'react'

class Checkout extends React.Component {

  static propTypes = {
    cart: PropTypes.object,
    code: PropTypes.string,
    contact: PropTypes.string,
    data: PropTypes.object,
    items: PropTypes.array,
    products: PropTypes.array,
    Store: PropTypes.object,
    shipping: PropTypes.number,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    token: PropTypes.string,
    total: PropTypes.number,
    variants: PropTypes.array,
    onUpdateContact: PropTypes.func
  }

  pasteur = null

  state = {
    step: 0,
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleComplete = this._handleComplete.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleContactStep = this._handleContactStep.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="maha-checkout">
        <div className="maha-checkout-header">
          <div className="maha-checkout-header-icon" onClick={ this._handleClose }>
            <i className="fa fa-times" />
          </div>
          <div className="maha-checkout-header-title">
            Checkout
          </div>
        </div>
        <div className="maha-checkout-body">
          <div className="maha-checkout-main">
            <div className="maha-checkout-main-header">
              <Steps { ...this._getSteps() } />
            </div>
            <div className="maha-checkout-main-body">
              <Stack { ...this._getStack() } />
            </div>
          </div>
          <div className="maha-checkout-sidebar">
            <Summary { ...this._getSummary() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'checkout',
      targetName: 'store'
    })
    this._handlePush(ContactStep, this._getContactStep.bind(this))
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getSteps() {
    const { step } = this.state
    return {
      completion: '',
      steps: ['Contact Information','Shipping Information','Payment Information','Checkout Complete'],
      current: step
    }
  }

  _getContactStep() {
    const { Store } = this.props
    return {
      Store,
      onNext: this._handleContactStep
    }
  }

  _getPaymentStep() {
    const { data, Store, token, total } = this.props
    return {
      data,
      Store,
      token,
      total,
      onSubmit: this._handleSubmit,
      onDone: this._handleComplete
    }
  }

  _getSummary() {
    const { items, shipping, subtotal, tax, total } = this.props
    return {
      items,
      shipping,
      subtotal,
      tax,
      total
    }
  }

  _handleBack() {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
    this._handlePop()
  }

  _handleClose() {
    this.pasteur.send('close')
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

  _handleContactStep(contact) {
    this.props.onUpdateContact(contact)
    this.setState({
      step: 1
    })
    this._handlePush(PaymentStep, this._getPaymentStep.bind(this))
  }

  _handleSubmit() {
    // const { data, token } = this.props
    // this.props.onSubmit(token, event.code, data)
  }

  _handleComplete() {
    this.setState({
      step: 4
    })
    this._handlePush(Complete, {})
  }

}

export default Checkout
