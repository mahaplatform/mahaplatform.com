import { Loader, Stack, Steps } from 'maha-client'
import PropTypes from 'prop-types'
import Summary from './summary'
import Step1 from './step1'
import React from 'react'

class Checkout extends React.Component {

  static propTypes = {
    cart: PropTypes.object,
    items: PropTypes.array,
    products: PropTypes.array,
    status: PropTypes.string,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    variants: PropTypes.array,
    onFetchProducts: PropTypes.func,
    onLoadCart: PropTypes.func
  }

  state = {
    step: 0,
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <div className="maha-checkout">
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
    )
  }

  componentDidMount() {
    this.props.onFetchProducts('maha')
    this.props.onLoadCart()
    this._handlePush(Step1, this._getStep1.bind(this))
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
