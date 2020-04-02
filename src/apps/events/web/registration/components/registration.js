import { Stack } from 'maha-client'
import PropTypes from 'prop-types'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Summary from './summary'
import Steps from './steps'
import React from 'react'

class Registration extends React.Component {

  static propTypes = {
    event: PropTypes.object
  }

  state = {
    step: 0,
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleStep1 = this._handleStep1.bind(this)
  _handleStep2 = this._handleStep2.bind(this)
  _handleStep3 = this._handleStep3.bind(this)
  _handleStep4 = this._handleStep4.bind(this)

  render() {
    const { event } = this.props
    return (
      <div className="registration">
        <div className="registration-main">
          <div className="registration-main-header">
            <Steps { ...this._getSteps() } />
          </div>
          <div className="registration-main-body">
            <Stack { ...this._getStack() } />
          </div>
        </div>
        <div className="registration-sidebar">
          { event.image &&
            <div className="registration-sidebar-image">
              <img src="https://dev.mahaplatform.com:8080/imagecache/fit=cover&w=350&h=175/assets/8346/10156387003857338.jpg" />
            </div>
          }
          <Summary { ...this._getSummary() }/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Step1, this._getStep1())
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
      current: step
    }
  }

  _getStep1() {
    const { event } = this.props
    return {
      event,
      onNext: this._handleStep1
    }
  }

  _getStep2() {
    const { event } = this.props
    return {
      event,
      onBack: this._handleBack,
      onNext: this._handleStep2
    }
  }

  _getStep3() {
    const { event } = this.props
    return {
      event,
      onBack: this._handleBack,
      onNext: this._handleStep3
    }
  }

  _getStep4() {
    const { event } = this.props
    return {
      event,
      onBack: this._handleBack,
      onNext: this._handleStep4
    }
  }

  _getSummary() {
    return {}
  }

  _handleBack() {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
    this._handlePop()
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

  _handleStep1(tickets) {
    this.setState({
      step: 1
    })
    this._handlePush(Step2, this._getStep2())
  }

  _handleStep2() {
    this.setState({
      step: 2
    })
    this._handlePush(Step3, this._getStep3())
  }

  _handleStep3() {
    this.setState({
      step: 3
    })
    this._handlePush(Step4, this._getStep4())
  }

  _handleStep4() {
    this.setState({
      step: 4
    })
  }

}

export default Registration
