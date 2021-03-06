import { Image, Stack, Steps } from '@client'
import PropTypes from 'prop-types'
import Complete from './complete'
import Summary from './summary'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import React from 'react'

class Registration extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    data: PropTypes.object,
    discount: PropTypes.number,
    event: PropTypes.object,
    items: PropTypes.array,
    quantities: PropTypes.object,
    result: PropTypes.object,
    status: PropTypes.string,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    tickets: PropTypes.array,
    token: PropTypes.string,
    total: PropTypes.number,
    onSubmit: PropTypes.func,
    onUpdateContact: PropTypes.func,
    onUpdateTickets: PropTypes.func,
    onUpdateQuantities: PropTypes.func
  }

  state = {
    step: 0,
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleComplete = this._handleComplete.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleStep1 = this._handleStep1.bind(this)
  _handleStep2 = this._handleStep2.bind(this)
  _handleStep3 = this._handleStep3.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleUpdateQuantities = this._handleUpdateQuantities.bind(this)

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
              <Image src={ event.image } transforms={{ w: 400 }} />
            </div>
          }
          <Summary { ...this._getSummary() }/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { event } = this.props
    this.context.analytics.trackPageView()
    this.context.analytics.trackMaha('event_id', event.id)
    this._handlePush(Step1, this._getStep1.bind(this))
  }

  componentDidUpdate(prevProps) {
    const { result, status } = this.props
    if(status !== prevProps.status && status === 'success') {
      this._handleComplete(result)
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
      steps: ['Ticket Selection','Contact Information','Ticket Information','Payment Information','Registration Complete'],
      current: step
    }
  }

  _getStep1() {
    const { event } = this.props
    return {
      event,
      onChange: this._handleUpdateQuantities,
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
    const { event, items } = this.props
    return {
      event,
      items,
      onBack: this._handleBack,
      onNext: this._handleStep3
    }
  }

  _getStep4() {
    const { data, event, token, total } = this.props
    return {
      data,
      event,
      token,
      total,
      onSubmit: this._handleSubmit,
      onDone: this._handleComplete
    }
  }

  _getSummary() {
    const { contact, discount, event, items, subtotal, tax, total } = this.props
    return {
      contact,
      discount,
      event,
      items,
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

  _handleStep1() {
    this.setState({
      step: 1
    })
    this._handlePush(Step2, this._getStep2.bind(this))
  }

  _handleStep2(contact) {
    this.props.onUpdateContact(contact)
    this.setState({
      step: 2
    })
    this._handlePush(Step3, this._getStep3.bind(this))
  }

  _handleStep3(tickets) {
    this.props.onUpdateTickets(tickets)
    this.setState({
      step: 3
    })
    this._handlePush(Step4, this._getStep4.bind(this))
  }

  _handleComplete(result) {
    this._handleTrack(result)
    this.setState({
      step: 4
    })
    this._handlePush(Complete, {})
  }

  _handleSubmit() {
    const { data, token } = this.props
    this.props.onSubmit(token, event.code, data)
  }

  _handleTrack(result) {
    const { items, event, tax, total } = this.props
    const { contact_id, registration_id } = result
    const { analytics } = this.context
    analytics.setUserId(contact_id)
    items.map(item => {
      analytics.addItem(registration_id, item.code, item.title, null, item.price, item.quantity, 'USD')
    })
    analytics.addTrans(registration_id, event.title, total, tax, null, null, null, null, 'USD')
    analytics.trackTrans()
    analytics.trackMaha('registration_id', registration_id)
  }

  _handleUpdateQuantities(quantities) {
    this.props.onUpdateQuantities(quantities)
  }

}

export default Registration
