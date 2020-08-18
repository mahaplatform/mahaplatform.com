import { Loader, Stack, Steps } from 'maha-client'
import PropTypes from 'prop-types'
import Summary from './summary'
import Pasteur from 'pasteur'
import Step1 from './step1'
import React from 'react'

class Checkout extends React.Component {

  static propTypes = {
    cart: PropTypes.object,
    code: PropTypes.string,
    items: PropTypes.array,
    products: PropTypes.object,
    Store: PropTypes.object,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    variants: PropTypes.array,
    onFetchCart: PropTypes.func,
    onFetchProducts: PropTypes.func,
    onGetCart: PropTypes.func
  }

  pasteur = null

  state = {
    step: 0,
    cards: []
  }

  _handleClose = this._handleClose.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    const { cart } = this.props
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
        { cart.status === 'loading' &&
          <div className="maha-checkout-body">
            <Loader />
          </div>
        }
        { cart.status === 'success' &&
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
        }
      </div>
    )
  }

  componentDidMount() {
    const { Store } = this.props
    this.props.onFetchProducts(Store.code)
    this.props.onGetCart()
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'checkout',
      targetName: 'store'
    })
    this._handlePush(Step1, this._getStep1.bind(this))
  }

  componentDidUpdate(prevProps) {
    const { code, Store } = this.props
    if(code !== prevProps.code) {
      this.props.onFetchCart(Store.code, code)
    }
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
      steps: ['Contact Information','Payment Information'],
      current: step
    }
  }

  _getStep1() {
    return {

    }
  }

  _getSummary() {
    const { items, subtotal, tax, total } = this.props
    return {
      items,
      subtotal,
      tax,
      total
    }
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

}

export default Checkout
