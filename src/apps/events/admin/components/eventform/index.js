import ContactConfig from './contact_config'
import TicketConfig from './ticket_config'
import Confirmation from './confirmation'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Sessions from './sessions'
import Programs from './programs'
import Payment from './payment'
import Event from './event'
import React from 'react'

class EventForm extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    method: PropTypes.string,
    programs: PropTypes.array,
    onSuccess: PropTypes.func
  }

  state = {
    cards: [],
    event: {
      program_id: 1
    }
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleConfirmation = this._handleConfirmation.bind(this)
  _handleContactConfig = this._handleContactConfig.bind(this)
  _handleEvent = this._handleEvent.bind(this)
  _handlePrograms = this._handlePrograms.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSessions = this._handleSessions.bind(this)
  _handlePayment = this._handlePayment.bind(this)
  _handleTicketConfig = this._handleTicketConfig.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Programs, this._getPrograms())
  }

  _getConfirmation() {
    const { event } = this.state
    return {
      event,
      onBack: this._handlePop,
      onChange: this._handleUpdate,
      onDone: this._handleConfirmation
    }
  }

  _getContactConfig() {
    const { event } = this.state
    return {
      event,
      onBack: this._handlePop,
      onChange: this._handleUpdate,
      onDone: this._handleContactConfig
    }
  }

  _getEvent() {
    const { event } = this.state
    return {
      event,
      onBack: this._handlePop,
      onChange: this._handleUpdate,
      onDone: this._handleEvent
    }
  }

  _getPayment() {
    const { event } = this.state
    return {
      event,
      onBack: this._handlePop,
      onChange: this._handleUpdate,
      onDone: this._handlePayment
    }
  }

  _getPrograms() {
    const { programs } = this.props
    return {
      programs,
      onBack: this._handleCancel,
      onChoose: this._handlePrograms
    }
  }

  _getSessions() {
    const { event } = this.state
    return {
      event,
      onBack: this._handlePop,
      onChange: this._handleUpdate,
      onDone: this._handleSessions
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getTicketConfig() {
    const { event } = this.state
    return {
      event,
      onBack: this._handlePop,
      onChange: this._handleUpdate,
      onDone: this._handleTicketConfig
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleConfirmation({ confirmation }) {
    this._handleUpdate({ confirmation })
    this._handleSave()
  }

  _handleContactConfig({ contact_config }) {
    this._handleUpdate({ contact_config })
    this._handlePush(TicketConfig, this._getTicketConfig())
  }

  _handleCreated({ data }) {
    this.context.router.close()
    this.context.modal.close()
  }

  _handleEvent(event) {
    this._handleUpdate(event)
    this._handlePush(Sessions, this._getSessions())
  }

  _handlePayment({ payment_methods, ticket_types }) {
    this._handleUpdate({ payment_methods, ticket_types })
    this._handlePush(ContactConfig, this._getContactConfig())
  }

  _handlePrograms(program) {
    this._handleUpdate({
      program_id: program.id
    })
    this._handlePush(Event, this._getEvent())
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
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

  _handleSave() {
    const { action, method } = this.props
    const { event } = this.state
    this.context.network.request({
      endpoint: action,
      method,
      body: event,
      onSuccess: this._handleSuccess
    })
  }

  _handleSessions({ sessions }) {
    this._handleUpdate({ sessions })
    this._handlePush(Payment, this._getPayment())
  }

  _handleTicketConfig({ ticket_config }) {
    this._handleUpdate({ ticket_config })
    this._handlePush(Confirmation, this._getConfirmation())
  }

  _handleUpdate(value) {
    this.setState({
      event: {
        ...this.state.event,
        ...value
      }
    })
  }

}

export default EventForm
