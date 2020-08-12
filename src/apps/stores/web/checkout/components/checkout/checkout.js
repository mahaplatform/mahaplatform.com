import { Stack, Steps } from 'maha-client'
import PropTypes from 'prop-types'
import Step1 from './step1'
import React from 'react'

class Checkout extends React.Component {

  static propTypes = {
  }

  state = {
    step: 0,
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="checkout">
        <div className="checkout-main">
          <div className="checkout-main-header">
            <Steps { ...this._getSteps() } />
          </div>
          <div className="checkout-main-body">
            <Stack { ...this._getStack() } />
          </div>
        </div>
        <div className="checkout-sidebar">
          sidebar
        </div>
      </div>
    )
  }

  componentDidMount() {
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
